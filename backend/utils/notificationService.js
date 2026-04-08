const Notification = require("../modules/notification/notification.model");

exports.createNotification = async ({
  recipient,
  type,
  title,
  message,
  relatedDonation,
  relatedOrg,
}) => {
  try {
    const notification = await Notification.create({
      recipient,
      type,
      title,
      message,
      relatedDonation,
      relatedOrg,
    });

    return notification;
  } catch (err) {
    console.error("Notification error:", err.message);
    return null; // Don't break main flow if notification fails
  }
};
