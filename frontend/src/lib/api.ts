export async function askAIBackend(question: string) {
  const res = await fetch("http://localhost:8001/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Server error:", text);
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = await res.json();
  return data.answer;
}
