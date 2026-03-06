interface CredentialsEmailTemplateData {
  userName: string;
  projectName: string;
  token: string;
  primaryColor: string;
  logoUrl?: string;
}

export function buildCredentialsEmailTemplate(
  data: CredentialsEmailTemplateData
): string {

  const projectLogo = data.logoUrl
    ? `<img src="${data.logoUrl}" alt="${data.projectName}" style="height:42px;margin-top:10px"/>`
    : `<div style="font-weight:600;font-size:16px;color:#1d1d1f">${data.projectName}</div>`;

  return `

<div style="
  background:#f5f5f7;
  padding:60px 20px;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
">

<table align="center" width="600"
style="
  background:#ffffff;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 25px 60px rgba(0,0,0,0.08);
">

<!-- TOP SAAS BAR -->
<tr>
<td style="
  height:6px;
  background:linear-gradient(90deg,#4F8CFF,#7A5CFF,#FF4FCB);
"></td>
</tr>


<!-- HEADER API -->
<tr>
<td style="
padding:30px;
text-align:center;
border-bottom:1px solid #f2f2f2;
background:#ffffff;
">

<img src="https://lh3.googleusercontent.com/pw/AP1GczP4qOBgkx3EBFfSB2K1o65lU6Cpdbcz_XJ-ANUzzr4OtzMUNgh2HnW_Gy3J5AyWh5anyfWVvXf2cuGLHP07BzX_UHH3asOc5KSgPzrgBFUV0qeiH7uLRpebfHeDLqkT5V55f_Wn1R291hj7m7sQAscw=w1418-h945-s-no-gm" height="140"/>

<div style="
font-size:12px;
color:#86868b;
margin-top:6px;
letter-spacing:0.4px;
">
Secure Email Delivery API
</div>

</td>
</tr>


<!-- CLIENT BRANDING -->
<tr>
<td style="padding:36px;background:#ffffff">

<div style="
border-radius:16px;
padding:28px;
background:linear-gradient(135deg, ${data.primaryColor}15, ${data.primaryColor}08);
border:1px solid ${data.primaryColor}25;
text-align:center;
">

<div style="
font-size:11px;
letter-spacing:1.2px;
text-transform:uppercase;
color:#6e6e73;
margin-bottom:14px;
">
Mensagem enviada por
</div>

<div style="
background:${data.primaryColor};
color:white;
display:inline-block;
padding:6px 16px;
border-radius:20px;
font-size:12px;
font-weight:600;
margin-bottom:16px;
box-shadow:0 6px 18px ${data.primaryColor}40;
">
${data.projectName}
</div>

<div style="margin-top:6px">
${projectLogo}
</div>

<div style="
margin-top:14px;
font-size:12px;
color:#6e6e73;
">
Esta mensagem foi enviada pela plataforma do cliente
</div>

</div>

</td>
</tr>


<!-- BODY -->
<tr>
<td style="padding:50px">

<h2 style="
margin:0 0 12px 0;
font-size:22px;
font-weight:600;
color:#1d1d1f;
">
Olá, ${data.userName}
</h2>

<p style="
font-size:15px;
color:#6e6e73;
line-height:1.7;
margin-bottom:24px;
">
Seu acesso ao sistema <strong>${data.projectName}</strong>
foi criado com sucesso.
</p>

<p style="
font-size:15px;
color:#6e6e73;
line-height:1.7;
margin-bottom:30px;
">
Utilize o código abaixo para autenticar seu acesso:
</p>


<div style="
margin:35px 0;
padding:30px;
border-radius:16px;
border:1px solid #e8e8ed;
background:#fafafa;
text-align:center;
">

<div style="
font-size:11px;
letter-spacing:2px;
color:#86868b;
margin-bottom:12px;
">
ACCESS CODE
</div>

<div style="
font-size:30px;
font-weight:700;
letter-spacing:8px;
color:${data.primaryColor};
">
${data.token}
</div>

<div style="
font-size:12px;
margin-top:12px;
color:#8e8e93;
">
Expira em 15 minutos
</div>

</div>


<!-- BUTTON -->
<div style="text-align:center;margin-top:40px">

<a href="#"
style="
background:${data.primaryColor};
color:white;
text-decoration:none;
padding:15px 34px;
border-radius:12px;
font-weight:600;
font-size:14px;
display:inline-block;
box-shadow:0 12px 30px rgba(0,0,0,0.15);
">
Acessar plataforma
</a>

</div>

</td>
</tr>


<tr>
<td style="
padding:22px;
text-align:center;
border-top:1px solid #f0f0f0;
background:#fafafa;
">

<div style="
display:inline-block;
padding:8px 14px;
background:#ffffff;
border-radius:20px;
border:1px solid #ececec;
font-size:11px;
color:#6e6e73;
">

🚀 Delivered securely by <strong>SendEmail API</strong>

</div>

</td>
</tr>


<!-- FOOTER -->
<tr>
<td style="
padding:30px;
text-align:center;
background:#fafafa;
">

<img src="https://lh3.googleusercontent.com/pw/AP1GczP4qOBgkx3EBFfSB2K1o65lU6Cpdbcz_XJ-ANUzzr4OtzMUNgh2HnW_Gy3J5AyWh5anyfWVvXf2cuGLHP07BzX_UHH3asOc5KSgPzrgBFUV0qeiH7uLRpebfHeDLqkT5V55f_Wn1R291hj7m7sQAscw=w1418-h945-s-no-gm" height="100"/>

<div style="
font-size:12px;
color:#8e8e93;
margin-top:10px;
">
Professional Email Infrastructure
</div>

<div style="
font-size:11px;
color:#8e8e93;
margin-top:8px;
">
© ${new Date().getFullYear()} SendEmail API
</div>

</td>
</tr>

</table>

</div>

`;
}