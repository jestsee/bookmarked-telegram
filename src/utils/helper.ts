import { bot } from '../bot';
import { BookmarkResponse } from '../types';

type SuccessPayload = Extract<BookmarkResponse, { type: 'success' }>;
export const sendSuccessMessage = (payload: SuccessPayload) => {
  return bot.telegram.sendMessage(
    payload.additionalData.chatId,
    `Success! ✅ Your bookmark has been saved. Access it [here](${payload.notionPageUrl})`,
    {
      reply_parameters: { message_id: payload.additionalData.messageId },
      parse_mode: 'Markdown'
    }
  );
};

type ErrorPayload = Extract<BookmarkResponse, { type: 'error' }>;
const sendReportMessage = async (payload: ErrorPayload) => {
  await bot.telegram.sendMessage(
    5721146079,
    `<b>🚨 ERROR REPORT</b>\n<pre>${payload.error}</pre>`,
    { parse_mode: 'HTML' }
  );

  return bot.telegram.forwardMessage(
    5721146079,
    payload.additionalData.chatId,
    payload.additionalData.messageId
  );
};

const sendErrorMessage = (payload: BookmarkResponse) => {
  return bot.telegram.sendMessage(
    payload.additionalData.chatId,
    `Something went wrong 🙏, we currently can't save your bookmark but this issue already reported to the developer`,
    {
      reply_parameters: { message_id: payload.additionalData.messageId }
    }
  );
};

export const handleError = async (payload: ErrorPayload) => {
  await sendReportMessage(payload);
  return sendErrorMessage(payload);
};
