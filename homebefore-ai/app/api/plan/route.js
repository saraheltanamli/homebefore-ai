import {NextResponse} from 'next/server';
export const runtime='nodejs';
export async function POST(req){
 try{
  const key=process.env.GEMINI_API_KEY;
  if(!key)return NextResponse.json({error:'AI is not configured yet. Add GEMINI_API_KEY in Vercel environment variables.'},{status:503});
  const data=await req.json();
  const {issue,urgency,dependents,details,language}=data;
  if(!['rent','eviction','income','utilities'].includes(issue)||!['today','week','month'].includes(urgency)||String(details||'').length>700)return NextResponse.json({error:'Invalid assessment input'},{status:400});
  const prompt=`You are an empathetic housing-stability information assistant for an educational student prototype. Respond in ${language==='es'?'Spanish':'English'}. Give a short, specific, achievable action plan with headings: Immediate steps, This week, Questions to ask, Safety and limitations. Situation: ${issue}; urgency: ${urgency}; dependents: ${Number(dependents)||0}; user context: ${String(details||'').slice(0,700)}. Do not invent specific organizations, availability, benefits eligibility, deadlines, legal rights, or contact information. Suggest calling 211 in the United States to inquire about local services; for eviction papers recommend prompt local legal aid and checking the actual notice. Do not claim to be a lawyer, financial adviser, or social worker. Avoid asking for names, addresses, immigration status, or sensitive personal details. Make it supportive, nonjudgmental, concise, and actionable. If immediate danger, advise emergency services.`;
  const model=process.env.GEMINI_MODEL||'gemini-2.5-flash';
  const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.3,maxOutputTokens:850}}),cache:'no-store'});
  const result=await response.json();
  if(!response.ok)return NextResponse.json({error:'AI service is unavailable or has reached its usage limit. Try again later.'},{status:502});
  const text=result?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('\n');
  if(!text)return NextResponse.json({error:'No response returned. Please try again.'},{status:502});
  return NextResponse.json({plan:text},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Unable to generate a plan. Please try again.'},{status:500})}
}
