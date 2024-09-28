const SactionModal = () => {
  return (
    <div className="more-bg-secondary w-full rounded-[20px] py-10 px-5">
      <div className="text-4xl mb-10 px-4">Access Restricted</div>
      <div className="text-xl px-4">
        <p className="mb-5 text-xl">
          We are sorry, but our services are not available in your region at this
          time.
        </p>
        <p className="mt-5 mb-5 text-xl">
          If you believe this is a mistake or have any questions, please contact
          our support team at: <br />
          <a
            href="mailto: support@more.markets"
            className="underline text-2xl text-blue-600"
          >
            support@more.markets
          </a>
        </p>
        <p />
        <p className="text-xl">Thank you for your understanding.</p>
      </div>
    </div>
  );
};

export default SactionModal;
