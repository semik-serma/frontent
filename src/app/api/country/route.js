export async function GET() {
  const res = await fetch('https://ipwho.is/');
  const data = await res.json();

    console.log(data)
  return Response.json({
    data: data.country_code?.toLowerCase()
  });
}