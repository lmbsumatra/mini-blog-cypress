interface ErrorMessageI {
  message: string;
}

export default function CErrorText({ message }: ErrorMessageI) {
  return <p className="text-red-500 text-[12px]">{message}</p>;
}
