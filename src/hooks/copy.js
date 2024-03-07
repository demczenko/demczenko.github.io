const head = (styles, options) => {
  return `
      <head>
          <title>Beliani</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&subset=cyrillic-ext,latin-ext" rel="stylesheet">
          <style>
              ${styles.map((style) => style.innerHTML).join("")}
          </style>
          <!--[if gte mso 9]>
                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" color="#ececec">
                  </v:background>
              <![endif]-->
          <!--[if gte mso 10]>
                  <xml>
                      <o:OfficeDocumentSettings>
                      <o:AllowPNG/>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                      </o:OfficeDocumentSettings>
                  </xml>
              <![endif]-->
      </head>
      `;
};

export const copy = (html) => {
  const document = new DOMParser().parseFromString(html, "text/html");
  const styles = Array.from(document.querySelectorAll("style") || []);

  const head_with_style = head(styles);
  styles.forEach((style) => style.remove());
  
  navigator.clipboard.writeText(`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      ${head_with_style}
      <body class="body" width="100%" style="width:100% !important; padding:0 !important; margin:0 auto !important; font-family: 'Open Sans', sans-serif !important;color:#000000; text-align:left; background-color:#ececec;">
      ${document.body.innerHTML}
      </body>
    </html>
`);
};
