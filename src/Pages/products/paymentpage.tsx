import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import bar from '../../assets/barcode.png'

const TELEGRAM_BOT_TOKEN = "8119231817:AAGAmxzBGY0vBPeVFM2hEEBbXkoAUGxm_HE";
const CHAT_ID = "6837437455";
const BANK_ACCOUNT_NUMBER = "1234567890";
const BANK_NAME = "Example Bank";
const BTC_WALLET = "bc1qexamplebtcwallet12345";
const BTC_BARCODE = bar; // Place your barcode image in the public folder
const CASHAPP_USERNAME = "$yourcashapp";
const PAYPAL_EMAIL = "yourpaypal@example.com";

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  if (!order) return <p>No order found.</p>;

 const escapeMarkdown = (text: string) => {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
};

const createMessage = () => {
  const itemsList = order.items
    .map(
      (item: any) =>
        `• ${escapeMarkdown(item.name)} x${item.quantity} — $${item.total.toLocaleString()}`
    )
    .join("\n");

  return `
🧾 *Payment Confirmation*

*Order ID:* ${escapeMarkdown(order.orderId)}
*Name:* ${escapeMarkdown(order.billingInfo.name)}
*Email:* ${escapeMarkdown(order.billingInfo.email)}
*Address:* ${escapeMarkdown(order.billingInfo.address)}
*Phone:* ${escapeMarkdown(order.billingInfo.phone)}
*Delivery State:* ${escapeMarkdown(order.deliveryState)}
*Delivery Fee:* $${order.deliveryFee.toLocaleString()}
*Total:* $${order.totalAmount.toLocaleString()}

💳 *Payment Method:* ${paymentMethod.toUpperCase()}

🛍️ *Items:*
${itemsList}
`.trim();
};
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    const message = createMessage();

    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      setTimeout(() => {
        const whatsappMessage = encodeURIComponent(message);
        const phone = "2348053208997";
        window.location.href = `https://wa.me/${phone}?text=${whatsappMessage}`;
      }, 4000);
    } catch (err) {
      setLoading(false);
      alert("Failed to send confirmation. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white">
      {loading ? (
        <div className="flex justify-center items-center h-[300px] text-center">
          <div className="animate-pulse text-lg text-[#1a2d42] font-semibold">
            Sending confirmation... Please wait.
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-[#1a2d42]">Payment Instructions</h1>

          {/* Payment Method Selector */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-[#1a2d42]">
              Select Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded p-2 bg-white text-[#1a2d42]"
            >
              <option value="bank">Bank Transfer</option>
              <option value="bitcoin">Bitcoin</option>
              <option value="cashapp">Cash App</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Conditional Payment Info */}
          {paymentMethod === "bank" && (
            <div className="mb-6 p-4 border rounded bg-gray-100">
              <h2 className="font-semibold mb-2 text-[#234156]">
                Transfer Payment (${order.totalAmount.toLocaleString()}) To:
              </h2>
              <p><strong>Bank:</strong> {BANK_NAME}</p>
              <p><strong>Account Number:</strong> {BANK_ACCOUNT_NUMBER}</p>
              <p><strong>Amount:</strong> ${order.totalAmount.toLocaleString()}</p>
            </div>
          )}

          {paymentMethod === "bitcoin" && (
            <div className="mb-6 p-4 border rounded bg-gray-100">
              <h2 className="font-semibold mb-2 text-[#234156]">Send BTC (${order.totalAmount.toLocaleString()} in BTC)</h2>
              <img src={BTC_BARCODE} alt="BTC Barcode" className="w-40 h-40 mx-auto mb-4" />
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={BTC_WALLET}
                  className="flex-1 p-2 border rounded text-sm bg-white"
                />
                <button
                  onClick={() => copyToClipboard(BTC_WALLET)}
                  className="px-3 py-1 text-sm bg-[#1a2d42] text-white rounded hover:bg-[#102230]"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {paymentMethod === "cashapp" && (
            <div className="mb-6 p-4 border rounded bg-gray-100">
              <h2 className="font-semibold mb-2 text-[#234156]">Cash App Payment</h2>
              <p>Send to CashApp Username:</p>
              <p className="font-bold text-lg">{CASHAPP_USERNAME}</p>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="mb-6 p-4 border rounded bg-gray-100">
              <h2 className="font-semibold mb-2 text-[#234156]">PayPal Payment</h2>
              <p>Send to PayPal Email:</p>
              <p className="font-bold text-lg">{PAYPAL_EMAIL}</p>
            </div>
          )}

          {/* Order Summary */}
          <div className="mb-6 border rounded p-4 bg-gray-50">
            <h2 className="font-semibold text-[#234156] mb-2">
              {order.billingInfo.name ? `${order.billingInfo.name}'s` : ""} Order Summary
            </h2>
            <ul className="space-y-2">
              {order.items.map((item: any, idx: number) => (
                <li key={idx} className="text-sm">
                  {item.name} x{item.quantity} — ${item.total.toLocaleString()}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right font-semibold">
              Delivery Fee: ${order.deliveryFee.toLocaleString()} <br />
              <span className="text-lg">Total: ${order.totalAmount.toLocaleString()}</span>
            </p>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmPayment}
            className="w-full py-3 bg-[#1a2d42] text-white font-medium rounded hover:bg-white hover:text-[#1a2d42] hover:border hover:border-[#1a2d42]"
          >
            I Have Made the Payment
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
