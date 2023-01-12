const nodemailer = require("nodemailer");
const formatRupiah = require("./changeMoney");

function sendEmail(email, price) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nabilusnup@gmail.com",
      pass: "pqpmsjeqffktukxr",
    },
  });

  let mailOptions = {
    from: "nabilusnup@gmail.com",
    to: email,
    subject: "Confirmed Your Payment was Successfully!",
    html: `
    <div class="es-wrapper-color">
    <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#f6f6f6"></v:fill>
        </v:background>
    <![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <td class="esd-email-paddings" valign="top">
                    <table class="es-content esd-header-popover es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe es-stripe-html" align="center">
                                    <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-banner" style="position: relative;" align="center" esdev-config="h7"><a target="_blank" href="https://viewstripo.email"><img class="adapt-img esdev-stretch-width esdev-banner-rendered" src="https://azzhui.stripocdn.email/content/guids/bannerImgGuid/images/image16734658563672115.png" alt="A brand new 5 stars Hotel" title="A brand new 5 stars Hotel" width="600" style="display: block;"></a></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" esd-general-paddings-checked="true" align="left">
                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="178" valign="top"><![endif]-->
                                                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-m-p0r es-m-p20b esd-container-frame" width="178" valign="top" align="center">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text" align="left">
                                                                                    <h2 style="line-height: 100%; font-family: georgia, times, 'times new roman', serif;"><span style="font-size: 24px; line-height: 100%;">Welcome to&nbsp;the </span><span style="line-height: 100%; font-size: 38px;">BlackDoorz</span></h2>
                                                                                    <p style="line-height: 100%; font-size: 38px;">ROOM.</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="20"></td><td width="362" valign="top"><![endif]-->
                                                    <table cellspacing="0" cellpadding="0" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="362" align="left">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text es-m-txt-c es-p5l" align="left">
                                                                                    <p style="color: #333333; line-height: 150%; font-size: 15px;">BlackDoorz Jakarta features 220 rooms as well as luxury hotel dining and entertainment options. Our hotel will be a haven for intimate and stylish events including weddings, corporate functions, and social gatherings.</p>
                                                                                </td>
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
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure" esd-general-paddings-checked="true" align="left">
                                                    <!--[if mso]><table width="600" cellpadding="0" cellspacing="0"><tr><td width="400" valign="top"><![endif]-->
                                                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-m-p0r es-m-p20b esd-container-frame" width="400" valign="top" align="center">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image" align="left" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email/"><img class="adapt-img" src="https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2022/12/18/2300/CGKPH-P0062-Park-Suite-Living-Room.jpg/CGKPH-P0062-Park-Suite-Living-Room.16x9.jpg?imwidth=1280" alt="Our state muddy" title="Our state muddy" style="display: block;" width="315"></a></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="0" valign="top"><![endif]-->
                                                    <table cellspacing="0" cellpadding="0" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="200" align="left">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image" align="center" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email/"><img class="adapt-img" src="https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2022/04/11/0151/CGKPH-P0021-Park-Suite-Deluxe-Bedroom.jpg/CGKPH-P0021-Park-Suite-Deluxe-Bedroom.16x9.jpg?imwidth=1280" alt="Corridor" title="Corridor" style="display: block;" width="199"></a></td>
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
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p30t es-p10b es-p20r es-p20l" esd-general-paddings-checked="true" align="left">
                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="178" valign="top"><![endif]-->
                                                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-m-p0r es-m-p20b esd-container-frame" width="178" valign="top" align="center">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text" align="left">
                                                                                    <h1 style="line-height: 100%;">Rooms & Suites</h1>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="20"></td><td width="362" valign="top"><![endif]-->
                                                    <table cellspacing="0" cellpadding="0" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="362" align="left">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text es-m-txt-c es-p10t es-p10l" align="right">
                                                                                    <p style="line-height: 150%;">Experience the finest in luxury hotel stays at BlackDoorz Jakarta, with 220 oversized rooms, including 36 suites within our property</p>
                                                                                </td>
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
                                            <tr>
                                                <td class="esd-structure es-p20" esd-general-paddings-checked="true" align="left">
                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image" align="center" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email/"><img class="adapt-img" src="https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2022/04/11/0151/CGKPH-P0021-Park-Suite-Deluxe-Bedroom.jpg/CGKPH-P0021-Park-Suite-Deluxe-Bedroom.16x9.jpg?imwidth=1280" alt width="270" style="display: block;"></a></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-image es-p20t" align="center" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email/"><img class="adapt-img" src="https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2022/04/11/0229/CGKPH-P0019-Park-Suite-Deluxe-Bathroom.jpg/CGKPH-P0019-Park-Suite-Deluxe-Bathroom.16x9.jpg?imwidth=1280" alt width="270" style="display: block;"></a></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                                    <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-m-p0r es-m-p20b esd-container-frame" width="270" align="center" esdev-config="h8">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text es-m-txt-c es-p30t es-p10b" align="left">
                                                                                    <h1>Park Suite Deluxe Monas View</h1>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-text es-m-txt-c" align="left">
                                                                                    <p style="color: #b58a60;"><strong>IDR 14.599.000 / per night</strong></p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-spacer es-p10t es-p10b" align="left" style="font-size:0">
                                                                                    <table width="70%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p10b es-m-txt-c" align="left">
                                                                                    <p style="font-size: 11px;">Experience the finest in luxury hotel stays at BlackDoorz Jakarta, with 220 oversized rooms, including 36 suites within our smoke free property. Sophisticated, spacious and contemporary guest rooms, designed with Indonesian touches and materials, all with uninterrupted views of Jakarta starting from the 25th floor. Unwind in the deep-soaking marble bath, with custom Le Labo® products, or enjoy the large, flat-screen TVs and integrated media hub. Upgrade your stay with one of our elegant suites, many featuring additional spaces such as dining and sitting areas.</p>
                                                                                </td>
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
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p30t es-p20b es-p20r es-p20l" esd-general-paddings-checked="true" align="left">
                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="178" valign="top"><![endif]-->
                                                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-m-p0r es-m-p20b esd-container-frame" width="178" valign="top" align="center">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text" align="left">
                                                                                    <h1 style="line-height: 100%;">Our</h1>
                                                                                    <h2 style="line-height: 100%;">Services<br></h2>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="20"></td><td width="362" valign="top"><![endif]-->
                                                    <table cellspacing="0" cellpadding="0" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="362" align="left">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text es-m-txt-c" align="right">
                                                                                    <p>We intend to make&nbsp;our services&nbsp;available for everybody. The customers seemed to be very satisfied with&nbsp;our services.</p>
                                                                                </td>
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
                                            <tr>
                                                <td class="esd-structure es-p20r es-p20l" align="left">
                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" class="esdev-mso-td" valign="top"><![endif]-->
                                                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                                    <table class="es-table-not-adapt" width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image es-p5r" valign="top" align="left" style="font-size:0"><a href target="_blank"><img src="https://azzhui.stripocdn.email/content/guids/CABINET_84730e095f6b7121c00e7e92986d984b/images/14871507121745958.png" alt width="41"></a></td>
                                                                                <td align="left">
                                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class="esd-block-text es-p5l es-m-txt-l" align="left">
                                                                                                    <h3>Free Parking</h3>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="20" class="esdev-mso-td es-hidden" valign="top"><td width="270" class="esdev-mso-td" valign="top"><![endif]-->
                                                    <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="270" align="left">
                                                                    <table class="es-table-not-adapt" width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image es-p5r" valign="top" align="left" style="font-size:0"><a href target="_blank"><img src="https://azzhui.stripocdn.email/content/guids/CABINET_cfaa002c0e55ba7d177d8fdd540817c1/images/55771507122595130.png" alt width="41"></a></td>
                                                                                <td align="left">
                                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class="esd-block-text es-p5l es-m-txt-l" align="left">
                                                                                                    <h3>Room Service</h3>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
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
                                            <tr>
                                                <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                                    <table class="es-table-not-adapt" width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image es-p5r" valign="top" align="left" style="font-size:0"><a href target="_blank"><img src="https://azzhui.stripocdn.email/content/guids/CABINET_cfaa002c0e55ba7d177d8fdd540817c1/images/4631507122595115.png" alt width="41"></a></td>
                                                                                <td align="left">
                                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class="esd-block-text es-p5l es-m-txt-l" align="left">
                                                                                                    <h3>Cleaning everyday</h3>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                                    <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="270" align="left">
                                                                    <table class="es-table-not-adapt" width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image es-p5r" valign="top" align="left" style="font-size:0"><a href target="_blank"><img src="https://azzhui.stripocdn.email/content/guids/CABINET_cfaa002c0e55ba7d177d8fdd540817c1/images/94031507122595028.png" alt width="41"></a></td>
                                                                                <td align="left">
                                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class="esd-block-text es-p5l es-m-txt-l" align="left">
                                                                                                    <h3>Free Wifi</h3>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
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
                                            <tr>
                                                <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                    <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                                    <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                        <tbody>
                                                            <tr>
                                                                <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                                    <table class="es-table-not-adapt" width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image es-p5r" valign="top" align="left" style="font-size:0"><a href target="_blank"><img src="https://azzhui.stripocdn.email/content/guids/CABINET_cfaa002c0e55ba7d177d8fdd540817c1/images/80761507122595188.png" alt width="41"></a></td>
                                                                                <td align="left">
                                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class="esd-block-text es-p5l es-m-txt-l" align="left">
                                                                                                    <h3>In-room safe</h3>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                                    <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="270" align="left">
                                                                    <table class="es-table-not-adapt" width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image es-p5r" valign="top" align="left" style="font-size:0"><a href target="_blank"><img src="https://azzhui.stripocdn.email/content/guids/CABINET_cfaa002c0e55ba7d177d8fdd540817c1/images/92911507122595083.png" alt width="41"></a></td>
                                                                                <td align="left">
                                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class="esd-block-text es-p5l es-m-txt-l" align="left">
                                                                                                    <h3>Restaurant</h3>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
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
                    <table class="es-footer esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr></tr>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure" esd-general-paddings-checked="true" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p20t es-p15b es-p15r es-p15l" align="center" esd-links-color="#333333" esd-links-underline="none">
                                                                                    <p><a target="_blank" style="line-height: 150%; color: #333333; font-size: 20px; text-decoration: none;" href="tel:123456789">021-88898</a></p>
                                                                                    <p>Jl. Kebon Sirih No.17-19, Kb. Sirih, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10340</p>
                                                                                </td>
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
                                                <td class="esd-structure" esd-general-paddings-checked="true" style="background-color: #80572b;" bgcolor="#80572b" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image" align="center" style="font-size:0"><a target="_blank"><img src="https://azzhui.stripocdn.email/content/guids/CABINET_c3aa6803686f8361447088d544a5e1f7/images/96221507104192901.png" alt width="41"></a></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p10t es-p15b" esdev-links-color="#f4eade" align="center">
                                                                                    <p style="color: #ffffff;">BlackDoorz © 2022&nbsp;|&nbsp;<a target="_blank" style="color: #f4eade;" href="https://viewstripo.email">Privacy policy</a></p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div style="position: absolute; left: -9999px; top: -9999px; margin: 0cm 0cm 0.0001pt;"></div>
<div style="position:absolute;left:-9999px;top:-9999px;"></div>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log("Email sent: " + info.response);
  });
}

module.exports = { sendEmail };
