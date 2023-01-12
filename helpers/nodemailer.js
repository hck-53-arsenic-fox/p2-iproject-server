const nodemailer = require('nodemailer');

function sendEmail(email) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.email",
        port: 465,
        service: "gmail",
        secure: true,
        auth: {
            user: "tweetwar2022@gmail.com",
            pass: "eqobxeywsphedxyc"
        },
        debug: true,
        logger: true
    });

    const option = {
        from: "tweetwar2022@gmail.com",
        to: email,
        subject: "Acount Success Create",
        text: "Your Account has been create",
        html: ` <div class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#efefef"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <!--[if !mso]><!-- -->
                        <table class="es-content es-visible-simple-html-only esd-footer-popover es-desk-hidden" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe es-stripe-html" align="center">
                                        <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure" esd-general-paddings-checked="false" style="background-color: #43285f;" bgcolor="#43285f" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image" align="center" style="font-size:0"><a target="_blank" href><img class="adapt-img" src="https://tlr.stripocdn.email/content/guids/CABINET_18b9b37a94ea92e75434475b4360dcd0/images/36441502442545607.jpg" alt="Happy Birthday!" title="Happy Birthday!" width="600"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p30b" esd-general-paddings-checked="false" style="background-color: #43285f;" bgcolor="#43285f" align="left">
                                                        <!--[if mso]><table width="600" cellpadding="0" cellspacing="0"><tr><td width="207"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r es-m-p20b esd-container-frame" width="187" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr class="es-hidden">
                                                                                    <td class="esd-block-image" align="left" style="font-size:0"><a target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_18b9b37a94ea92e75434475b4360dcd0/images/27021502445622301.jpg" alt="Very lovely balloon" title="Very lovely balloon" width="116"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class="es-hidden" width="20"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="187"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p20b esd-container-frame" width="187" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr class="es-visible-amp-html-only">
                                                                                    <td class="esd-block-text es-p15t" align="center">
                                                                                        <p style="line-height: 150%; color: #ffffff; font-size: 16px; font-family: arial, 'helvetica neue', helvetica, sans-serif;">it's your birthday and we think you deserve a little gift</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p10t es-p20b" align="center">
                                                                                        <p style="color: #ffffff; line-height: 150%; font-family: 'playfair display', georgia, 'times new roman', serif; font-size: 65px;">20% <span style="font-size: 24px; line-height: 150%;">off</span></p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p30b es-p10r es-p10l" align="center">
                                                                                        <p style="color: #ffffff; line-height: 150%;"><br></p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-button es-p5t es-p5b es-p10r es-p10l" align="center"><span class="es-button-border" style="display: block;"><a href="https://viewstripo.email/" class="es-button" target="_blank" style="border-left-width: 0px; border-right-width: 0px; display: block;">+ Shop now</a></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="186"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="186" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr class="es-hidden">
                                                                                    <td class="esd-block-image" align="right" style="font-size:0"><a target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_18b9b37a94ea92e75434475b4360dcd0/images/77061502445629778.jpg" alt="Very lovely balloon" title="Very lovely balloon" width="111"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!--<![endif]-->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(option, (err, info) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            resolve('success')
            console.log("sent: " + info);
        })
    })
}

module.exports = sendEmail