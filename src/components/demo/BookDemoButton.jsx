import Link from "next/link";

export default function BookDemoButton({
  label = "Book a demo",
  showArrow = true,
  className = "btn btn-primary",
  style,
  ...rest
}) {
  return (
    <Link href="/contact-us" className={className} style={style} {...rest}>
      {label}
      {showArrow && <span className="arr">→</span>}
    </Link>
  );
}
