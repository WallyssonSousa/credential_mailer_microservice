interface CredentialsEmailTemplateData {
  userName: string;
  projectName: string;
  token: string;
  primaryColor: string;
  logoUrl?: string;
  loginUrl?: string;
}

export function buildCredentialsEmailTemplate(
  data: CredentialsEmailTemplateData
): string {
  const year = new Date().getFullYear();
  const loginUrl = data.loginUrl ?? "#";

  const projectLogo = data.logoUrl
    ? `<img src="${data.logoUrl}" alt="${data.projectName}" style="height:36px;display:block;margin:0 auto;">`
    : `<span style="font-weight:700;font-size:15px;color:#1a1a2e;">${data.projectName}</span>`;

  // Split token into groups of 3 for readability (e.g. ABC-DEF-GHI)
  const formattedToken = data.token.length >= 6
    ? data.token.match(/.{1,3}/g)?.join("-") ?? data.token
    : data.token;

  return `<!DOCTYPE html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Acesso — ${data.projectName}</title>
  <style>
    :root { color-scheme: light dark; }

    body {
      margin: 0; padding: 0;
      background-color: #f0f2f5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-text-size-adjust: 100%;
    }

    /* ── Dark mode ── */
    @media (prefers-color-scheme: dark) {
      body, .bg          { background-color: #0d0d12 !important; }
      .card              { background-color: #16161f !important; border-color: #2a2a38 !important; }
      .header            { background-color: #1c1c28 !important; border-color: #2a2a38 !important; }
      .footer            { background-color: #1c1c28 !important; border-color: #2a2a38 !important; }
      .title             { color: #f0f0f8 !important; }
      .body-text         { color: #9898b0 !important; }
      .token-box         { background-color: #1e1e2e !important; border-color: #2e2e42 !important; }
      .token-label       { color: #6060a0 !important; }
      .token-value       { color: inherit !important; }
      .footer-text       { color: #505065 !important; }
      .logo-text         { color: #e0e0f0 !important; }
    }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .wrapper  { padding: 16px 8px !important; }
      .card     { border-radius: 14px !important; }
      .body-pad { padding: 24px 20px !important; }
      .header   { padding: 20px !important; }
      .footer   { padding: 16px 20px !important; }
      .title    { font-size: 18px !important; }
      .btn-td   { display: block !important; width: 100% !important; }
      .btn-a    { display: block !important; text-align: center !important; padding: 13px 0 !important; }
    }
  </style>
</head>

<body class="bg">
<div class="wrapper" style="padding:32px 12px;">

  <!-- Outer centering table -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr><td align="center">

    <!-- Card -->
    <table class="card" width="560" cellpadding="0" cellspacing="0" role="presentation"
      style="max-width:560px;width:100%;background:#ffffff;border-radius:18px;border:1px solid #e4e6ed;overflow:hidden;">

      <!-- Accent bar -->
      <tr>
        <td style="height:4px;background:linear-gradient(90deg,${data.primaryColor},#a78bfa,#f472b6);font-size:0;line-height:0;">&nbsp;</td>
      </tr>

      <!-- Header -->
      <tr>
        <td class="header" align="center"
          style="padding:22px 30px 18px;border-bottom:1px solid #e4e6ed;background:#fafbff;">
          ${projectLogo}
          <div class="body-text" style="font-size:11px;color:#9090a8;margin-top:6px;letter-spacing:.5px;text-transform:uppercase;">
            Autenticação segura
          </div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td class="body-pad" style="padding:28px 30px 24px;">

          <p class="title" style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1a1a2e;line-height:1.3;">
            Olá, ${data.userName} 👋
          </p>
          <p class="body-text" style="margin:0 0 20px;font-size:14px;color:#6c6c84;line-height:1.6;">
            Seu acesso ao <strong style="color:#1a1a2e;">${data.projectName}</strong> foi criado.
            Use o código abaixo para entrar:
          </p>

          <!-- Token box -->
          <table class="token-box" width="100%" cellpadding="0" cellspacing="0" role="presentation"
            style="border:1px solid #e4e6ed;border-radius:12px;background:#f8f8fc;margin-bottom:22px;">
            <tr>
              <td align="center" style="padding:18px 16px;">
                <div class="token-label"
                  style="font-size:10px;font-weight:600;letter-spacing:2.5px;color:#8080a8;text-transform:uppercase;margin-bottom:8px;">
                  Código de acesso
                </div>
                <div class="token-value"
                  style="font-size:22px;font-weight:700;letter-spacing:6px;color:${data.primaryColor};font-variant-numeric:tabular-nums;">
                  ${formattedToken}
                </div>
                <div class="token-label"
                  style="font-size:11px;color:#9090a8;margin-top:8px;">
                  ⏱ Expira em 15 minutos
                </div>
              </td>
            </tr>
          </table>

          <!-- CTA button (Outlook-safe VML + HTML) -->
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
            href="${loginUrl}" style="height:44px;v-text-anchor:middle;width:200px;" arcsize="23%"
            fillcolor="${data.primaryColor}" stroke="f">
            <w:anchorlock/>
            <center style="color:#ffffff;font-family:sans-serif;font-size:14px;font-weight:700;">
              Acessar plataforma
            </center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <table align="center" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="btn-td" align="center"
                style="border-radius:10px;background:${data.primaryColor};">
                <a class="btn-a" href="${loginUrl}" target="_blank" rel="noopener"
                  style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:700;
                         color:#ffffff;text-decoration:none;border-radius:10px;
                         font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                  Acessar plataforma →
                </a>
              </td>
            </tr>
          </table>
          <!--<![endif]-->

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td class="footer" align="center"
          style="padding:16px 30px;border-top:1px solid #e4e6ed;background:#fafbff;">
          <p class="footer-text" style="margin:0;font-size:11px;color:#9090a8;line-height:1.6;">
            © ${year} ${data.projectName} &nbsp;·&nbsp; Email enviado automaticamente — não responda
          </p>
          <p class="footer-text" style="margin:6px 0 0;font-size:10px;color:#b0b0c4;">
            Se você não solicitou este acesso, ignore este email.
          </p>
        </td>
      </tr>

    </table>
    <!-- /Card -->

  </td></tr>
  </table>

</div>
</body>
</html>`;
}