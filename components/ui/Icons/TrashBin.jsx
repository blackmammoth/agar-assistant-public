function TrashCan(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
      >
        <path d="M25 8V1h14v7M14 10v53h36V10M26 20v34M38 20v34M10 9h44" />
      </g>
    </svg>
  );
}

export default TrashCan;
