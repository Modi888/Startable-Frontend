import React from 'react';

const Button = ({ text, action, styles, type = "button", modify }) => {
  const primaryStyles = "tw-text-primary tw-bg-primaryBg";
  const secondaryStyles = "tw-text-secondary tw-bg-secondaryBg";

  return (
    <button
      className={`tw-py-2 tw-px-4 tw-rounded-lg tw-capitalize tw-shadow-lg hover:tw-shadow-none tw-text-base tw-font-semibold tw-transition-all ${
        styles === "secondary" ? secondaryStyles : primaryStyles
      } ${modify}`}
      onClick={action}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;