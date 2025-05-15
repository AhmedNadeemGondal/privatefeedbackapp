export default function ResponseWrapper(
  success: boolean,
  message: string | object,
  status: number
) {
  return Response.json(
    {
      success,
      message,
    },
    { status }
  );
}
