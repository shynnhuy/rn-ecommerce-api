const { Expo } = require("expo-server-sdk");
const { BadRequest } = require("http-errors");

const expo = new Expo();

// type PushMessage = {
//   to : string,
//   data ?: Object,
//   title ?: string,
//   body ?: string,
//   ttl ?: number,
//   expiration?: number,
//   priority ?: 'default' | 'normal' | 'high',
//   subtitle ?: string,
//   sound ?: 'default' | null,
//   badge ?: number,
//   _category ?: string,
//   channelId ?: string
// }

module.exports = {
  isValidPushToken: (token) => {
    return new Promise((resolve, reject) => {
      if (!Expo.isExpoPushToken(token)) {
        reject(BadRequest("Push notification token is unavailable"));
      }
      resolve(token);
    });
  },
  sendPushNotification: (tokens, message) => {
    try {
      if (typeof tokens === "string") {
        tokens = [tokens];
      }

      let messages = [];
      for (let token of tokens) {
        if (!Expo.isExpoPushToken(token)) {
          // throw BadRequest("Push notification token is unavailable");
          console.error("Push notification token is unavailable");
          continue;
        }

        messages.push({
          to: token,
          sound: "default",
          title: message.title,
          body: message.body,
          data: message, // TODO: message or message.data ?
        });
      }

      const chunks = expo.chunkPushNotifications(messages);
      let tickets = [];
      (async () => {
        for (let chunk of chunks) {
          try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
            console.log("ticketChunk: ", ticketChunk);
            // TODO: Handle errors
          } catch (error) {
            console.error(error);
          }
        }
      })();

      _retrieveReceipts(tickets);
    } catch (error) {
      throw error;
    }
  },
};

const _retrieveReceipts = (tickets) => {
  // Apple and Google so you can handle it appropriately.
  let receiptIds = [];
  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);

        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        for (let receipt of receipts) {
          if (receipt.status === "ok") {
            console.log("Receipt status received and ok");
            continue;
          } else if (receipt.status === "error") {
            console.error(
              `There was an error sending a notification: ${receipt.message}`
            );
            if (receipt.details && receipt.details.error) {
              // The error codes are listed in the Expo documentation:
              // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
              // You must handle the errors appropriately.
              console.error(`The error code is ${receipt.details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
};
