const aoijs = require("aoi.js")

const bot = new aoijs.Bot({
  token: process.env.TOKEN, //Discord Bot Token
  prefix: ["$getServerVar[prefix]", "economy."],
  fetchInvites: false //Discord Bot Prefix
})

// Handelers and loaders
bot.onMessage()

bot.command({
name: "ping",
code: `Pong! \`$ping\`ms`
})

//Ready Event
bot.readyCommand({
    channel: "",
    code: `$log[Ready on $userTag[$clientID]]`
})

// Status
bot.status({
  text: "+help | EconomicalBot v1.1",
  type: "PLAYING",
  status: "dnd",
  time: 12
})

bot.status({
  text: "$serverCount servers | $allMembersCount users.",
  type: "PLAYING",
  status: "dnd",
  time: 12
})

//////////////////////////
//////////////////////////
//////////////////////////
///// VARIABLES  /////////
/////////////////////////
/////////////////////////

// Bot n Utility Variables
bot.variables({
  prefix: "+"
})


bot.command({
  name: "help",
  code: `
  $title[Help Menu]
  $description[💰 **Economy :**
  \`work\`, \`beg\`, \`bal\`, \`profile\`, \`deposit\`, \`withdraw\`, \`daily\`, \`open-daily\`, \`heist\`, \`givemoney\`, \`shop\`, \`buy-<object>\`, \`open-<chest>\`, \`rob\`, \`steal\`, \`search\`, \`srap-<object>\`, \`filp-<object>\`, \`fish\`, \`lb-bank\`, \`lb-wallet\`

🎋 **Admin:**
\`setprefix\`

👑 **Owner :**
\`reset\`, \`add-money\`, \`remove-money\`]
$footer[$username[$clientID]]
$addTimestamp
$color[RANDOM]
`
})


bot.command({
name: "work", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[45;100]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[5;10]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Work]
$description[
$username, $randomText[it looks like you'd do anything for money 😳.;you were employed as a construction worker today!;you're a discord workaholic!;nice music dude! Here, you earned it!;you were employed as a hair stylist today;hacking can make you a good deal of money if you know what you're doing! From your last hack job, you made;your bitcoin miner scraped up some cash for you!;were you not satisfied with your past employers? Well I counted the tips from your pole dancing gig and you didn't do too bad 😳]
]
$footer[💵 +$$random[45;100] | 🗡 +$random[5;10]xp]
$globalCooldown[60s;Try again in %time%]`
})
 
bot.command({
name: "beg", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;25]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[0;5]];$authorID]
$title[Beg]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[$username, $randomText[Begging is for the weak so here;Here, take this and go;Here, don't let this be a habit;I take you for a well put together human being, why are you begging?;Why can't you just get a job?]
]
$footer[💵 +$$random[0;25] | 🗡 +$random[0;5]xp]
$globalCooldown[30s;Quit being a begger and try again in %time%]`
})
 
bot.command({
name: "bal", 
code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;Discord bots dont have a balance]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
$color[RANDOM]
$title[$username[$mentioned[1;yes]]'s Balance]
$description[
$addField[🗡 Experience;
$numberSeparator[$getGlobalUserVar[XP;$mentioned[1;yes]]]xp
]
$addField[💵 Wallet;
$$numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]
]
$addField[🏦 Bank;
$$numberSeparator[$getGlobalUserVar[Bank;$mentioned[1;yes]]]
]
$addField[📊 Net Worth;
$$numberSeparator[$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$getGlobalUserVar[Bank;$mentioned[1;yes]]]]
]]`
})
 
bot.command({
name: "profile",
code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;**⛔ Discord bots dont have profiles**]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
$title[Economy profile]
$color[RANDOM]
$description[
**__User/ID__**:
<@$mentioned[1;yes]>
$username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]
(\`$mentioned[1;yes]\`)
 
**__Chests__**:
**$getGlobalUserVar[DailyChest;$mentioned[1;yes]]** | Daily
**$getGlobalUserVar[lucky;$mentioned[1;yes]]** | Lucky
**$getGlobalUserVar[spiteful;$mentioned[1;yes]]** | Spiteful
 
**__Flow__**:
\`💵\` **$$numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]**
\`🏦\` **$$numberSeparator[$getGlobalUserVar[Bank;$mentioned[1;yes]]]**
\`📊\` **$$numberSeparator[$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$getGlobalUserVar[Bank;$mentioned[1;yes]]]]**
\`🗡\` **$numberSeparator[$getGlobalUserVar[XP;$mentioned[1;yes]]]**xp
 
**__Assets__**:
\`💼\` ($getGlobalUserVar[duffle;$mentioned[1;yes]]) Bags
\`📺\` ($getGlobalUserVar[tv;$mentioned[1;yes]]) TVs
\`📱\` ($getGlobalUserVar[smartphone;$mentioned[1;yes]]) Smartphones
\`💻\` ($getGlobalUserVar[laptop;$mentioned[1;yes]]) Laptops
\`🚗\` ($getGlobalUserVar[car;$mentioned[1;yes]]) Cars
\`🚚\` ($getGlobalUserVar[truck;$mentioned[1;yes]]) Trucks
\`🚁\` ($getGlobalUserVar[helicopter;$mentioned[1;yes]]) Helicopters
\`🏫\` ($getGlobalUserVar[apartment;$mentioned[1;yes]]) Apartments
\`🏡\` ($getGlobalUserVar[house;$mentioned[1;yes]]) Houses
\`🏰\` ($getGlobalUserVar[mansion;$mentioned[1;yes]]) Mansions
]`
})
 
 
bot.command({
name: "deposit", 
aliases: 'dep',
code: `$setGlobalUserVar[Bank;$sum[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
$title[Deposited]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[
$username, you deposited $$numberSeparator[$message] into your bank!]
$footer[💵 $$numberSeparator[$sub[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sum[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
$onlyIf[$isNumber[$message[1]]==true;That's not a number!]
$onlyIf[$message<=$getGlobalUserVar[Wallet;$authorID];Cannot deposit more than what's in your wallet!]
$argsCheck[>1;How much are you depositing? Try this: \`$getServerVar[prefix]dep <amount>\`]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>0;There's nothing to deposit!]`
})
 
 
bot.command({
  name: 'withdraw',
  aliases: 'with',
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
$setGlobalUserVar[Bank;$sub[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
$title[Withdrew]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[
$username, you withdrew $$numberSeparator[$message] from your bank!]
$footer[💵 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sub[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
$onlyIf[$isNumber[$message[1]]==true;That's not a number!]
$onlyIf[$message<=$getGlobalUserVar[Bank;$authorID];Cannot withdraw more than what's in your bank!]
$argsCheck[>1;How much are you withdrawing?]
$onlyIf[$getGlobalUserVar[Bank;$authorID]>0;There's nothing to withdraw!]`
})
 
 
bot.command({
name: "daily",
code: `$setGlobalUserVar[DailyChest;$sum[$getGlobalUserVar[DailyChest;$authorID];1];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Daily Chest]
$description[
Congrats $username! You received 1 daily chest!
This action can be done once every 12 hours.
]
$footer[To open use, $getServerVar[prefix]open-daily]
$onlyIf[$getGlobalUserVar[DailyChest;$authorID]<1;**You still have an unopened daily chest in your inventory. Open it for room to receive another chest.** \`$getServerVar[prefix]open-daily\`]
$globalCooldown[12h;**⛔ Please wait %time% before you can claim another daily chest!**]`
})
 
 
bot.command({
name: "open-daily",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
$setGlobalUserVar[DailyChest;$sub[$getGlobalUserVar[DailyChest;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];15];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Daily Chest]
$description[$username, you opened your Daily Chest!
]
$footer[💵 +$250 | 🗡 +15xp]
$onlyIf[$getGlobalUserVar[DailyChest;$authorID]==1;**⛔ You dont have a Daily Chest yet! Try using \`$getServerVar[prefix]daily\` to receive your Daily Chest and then run this command to open it**]`
})
 
 
bot.command({
name: "heist",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[4800;7600]];$authorID]
$setGlobalUserVar[laptop;$sub[$getGlobalUserVar[laptop;$authorID];1];$authorID]
$setGlobalUserVar[smartphone;$sub[$getGlobalUserVar[smartphone;$authorID];1];$authorID]
$setGlobalUserVar[duffle;$sub[$getGlobalUserVar[duffle;$authorID];1];$authorID]
$setGlobalUserVar[tv;$sub[$getGlobalUserVar[tv;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[20;42]];$authorID]
$color[00ff00]
$thumbnail[$userAvatar[$authorID]]
$title[Heist]
$description[$username, you used a \`Laptop\` to hack the security system in your favor, a rooted \`Smartphone\` to shut down the cameras and used the \`TV\` screen to monitor surveillance while you fill your \`Bag\` with a buttload of cash and then tossed the contraband $randomText[in a lake!;over a bridge!;down a storm drain!;in separate dumpsters around town!;in the bed of a random truck!;on a roof!;in a ditch!]
]
$footer[💵 +$$numberSeparator[$random[4800;7600]] | 🗡 +$random[20;42]]
$onlyIf[$getGlobalUserVar[laptop;$authorID]>=1;Missing laptop. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[smartphone;$authorID]>=1;Missing smartphone. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[duffle;$authorID]>=1;Missing bag. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[tv;$authorID]>=1;Missing TV. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=300;You need at least 300 XP to commit a heist! \`XP will not be deducted and is only needed as a requirement!\`]
$globalCooldown[3h;Wait %time% until you can launch another heist!]`
})
 
bot.command({
name: "givemoney", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$noMentionMessage];$mentioned[1;yes]]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$noMentionMessage];$authorID]
$color[RANDOM]
$thumbnail[$userAvatar[$authorID]]
$title[$username gave $username[$mentioned[1]] money]
$description[
$username gave $username[$mentioned[1]] **$noMentionMessage** :dollar:!
$username[$mentioned[1]] is now holding **$sum[$getGlobalUserVar[Wallet;$mentioned[1]];$noMentionMessage]** :dollar: in his wallet!
]
$onlyIf[$noMentionMessage<=$getGlobalUserVar[Wallet;$authorID];**⛔ You don't have enough in your wallet**]
$onlyIf[$mentioned[1]!=$authorID;**⛔ You can't give money to yourself**]
$onlyIf[$mentioned[1]!=;**⛔ Mention someone to give money to and then the amount, try using this format**: \`$getServerVar[prefix]givemoney <@user> <amount>\`]
$onlyIf[$isBot[$mentioned[1]]!=true;**⛔ You can't give money to a Discord bot**]
$onlyIf[$isNumber[$noMentionMessage]==true;**⛔ That is not a number, try using this format**: \`$getServerVar[prefix]givemoney <@user> <amount>\`]
$suppressErrors[Usage: **$getServerVar[prefix]givemoney <@user> <amount>**]`
})
 
bot.command({
name: "shop", 
code: `$thumbnail[$authorAvatar]
$title[Economy Shop]
$color[RANDOM]
$description[
$addField[__Items:__;
\`💼\` **$250 | bag**
\`📺\` **$400 | tv**
\`📱\` **$500 | phone**
\`💻\` **$1,000 | laptop**
\`🚗\` **$10,000 | car**
\`🚚\` **$15,000 | truck**
\`🚁\` **$20,000 | helicopter**
\`🏫\` **$50,000 | apartment**
\`🏡\` **$100,000 | house**
\`🏰\` **$500,000 | mansion**
]
$addField[__Purchasable chests:__;
**$250 | lucky**
**$1,000 | spiteful**
\`Lucky\` - **Press your luck. Nobody loses!**
\`Spiteful\` - **Possibility of winning $10,000 but be warned, it could be spiteful! Goodluck!**
]]`
})
 
bot.command({
name: "buy-car", 
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];10000];$authorID]
$setGlobalUserVar[car;$sum[$getGlobalUserVar[car;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];250];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=10000;Need $10,000 in your wallet, try withrawing it first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=250;You need 250 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🚗 $username]
$description[
Nice! You bought a Car for $10,000!
**250xp has been deducted!**
You can strip it for parts to scrap for more money and XP.
]
$footer[Usage: $getServerVar[prefix]scrap-car]`
})
 
bot.command({
name: "buy-phone",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];500];$authorID]
$setGlobalUserVar[smartphone;$sum[$getGlobalUserVar[smartphone;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>499;Need $500 in your wallet, try withrawing it first]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[📱 $username]
$description[
Nice! You bought a smartphone for $500!
]
$footer[This item is used to commit a heist]`
})
 
bot.command({
name: "buy-tv",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];400];$authorID]
$setGlobalUserVar[tv;$sum[$getGlobalUserVar[tv;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>399;Need $400 in your wallet, try withrawing first]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[📺 $username]
$description[
Nice! You bought a TV for $400!
]
$footer[This item is used to commit a heist]`
})
 
bot.command({
name: "buy-truck",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];15000];$authorID]
$setGlobalUserVar[truck;$sum[$getGlobalUserVar[truck;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];300];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=15000;Need $15,000 in your wallet, try withrawing it first]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=300;You need 300 XP, in which will be deducted after purchase]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🚚 $username]
$description[
Nice! You bought a Truck for $15,000!
**300xp has been deducted!**
You can strip it for parts to scrap for more money and XP.
]
$footer[Usage: $getServerVar[prefix]scrap-truck]`
})
 
bot.command({
name: "buy-laptop",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];1000];$authorID]
$setGlobalUserVar[laptop;$sum[$getGlobalUserVar[laptop;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>999;Need $1,000 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[💻 $username]
$description[
Nice! You bought a laptop for $1,000!
]
$footer[This item is used to commit a heist]`
})
 
bot.command({
name: "buy-helicopter",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];20000];$authorID]
$setGlobalUserVar[helicopter;$sum[$getGlobalUserVar[helicopter;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];350];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=20000;Need $20,000 in your wallet, try withrawing it first]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=350;You need 350 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🚁 $username]
$description[
Nice! You bought a Helicopter for $20,000!
**350xp has been deducted!**
You can strip it for parts to scrap for more money and XP.
]
$footer[Usage: $getServerVar[prefix]scrap-helicopter]`
})
 
bot.command({
name: "buy-house",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];100000];$authorID]
$setGlobalUserVar[house;$sum[$getGlobalUserVar[house;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];500];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=100000;Need $100,000 in your wallet, try withrawing it first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=500;You need 500 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🏡 $username]
$description[
Nice! Stepping up! You bought a House for $100,000!
**500 XP has been deducted!**
Coming up in the world I see! The real estate business is in high demand and you can make a difference! Try flipping the house to make a profit and earn more XP.
]
$footer[Usage: $getServerVar[prefix]flip-house]`
})
 
 
bot.command({
name: "buy-apartment",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];50000];$authorID]
$setGlobalUserVar[apartment;$sum[$getGlobalUserVar[apartment;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];400];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=50000;Need $50,000 in your wallet, try withrawing it first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=400;You need 400 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🏫 $username]
$description[
Nice! Stepping up! You bought an Apartment for $50,000!
**400xp has been deducted!**
The real estate business is in high demand and you can make a difference! Try flipping the apartment to make a profit and earn more XP.
]
$footer[Usage: $getServerVar[prefix]flip-apartment]`
})
 
bot.command({
name: "buy-mansion",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];500000];$authorID]
$setGlobalUserVar[mansion;$sum[$getGlobalUserVar[mansion;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];750];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=500000;Need $500,000 in your wallet, try withrawing it first]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=750;You need 750 XP, in which will be deducted after purchase]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🏰 $username]
$description[
Nice! You bought a Mansion for $500,000!
**750 XP has been deducted!**
Now you're just showing off and living it up lol! Try flipping the mansion to make a profit and earn more XP.
]
$footer[Usage: $getServerVar[prefix]flip-mansion]`
})
 
bot.command({
name: "buy-bag",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
$setGlobalUserVar[duffle;$sum[$getGlobalUserVar[duffle;$authorID];1];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[💼 $username]
$description[
Nice! You bought a dufflebag for $250!
]
$footer[This item is used to commit a heist]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>249;Need $250 in your wallet, try withdrawing it first]`
})
 
bot.command({
name: "buy-spiteful",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];1000];$authorID]
$setGlobalUserVar[spiteful;$sum[$getGlobalUserVar[spiteful;$authorID];1];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Spiteful Chest]
$description[You bought a Spiteful chest for $1,000!
**Open it and see what you find!
Just be warned! It could be spiteful, Goodluck!**
]
$footer[Usage: $getServerVar[prefix]open-spiteful]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>999;Need $1,000 in your wallet, try withrawing it first]`
})
 
bot.command({
name: "open-spiteful",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$randomText[1;850;860;900;950;1000;1000;1000;1100;1150;1175;1200;1250;1500;5000;10000]];$authorID]
$setGlobalUserVar[spiteful;$sub[$getGlobalUserVar[spiteful;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[10;20]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Spiteful Chest]
$description[You opened a spiteful Chest!
]
$footer[💵 +$$numberSeparator[$randomText[1;850;860;900;950;1000;1000;1000;1100;1150;1175;1200;1250;1500;5000;10000]] | 🗡 +$random[10;20]xp]
$onlyIf[$getGlobalUserVar[spiteful;$authorID]>=1;You cant open a chest you don't have! Try purchasing one from the shop.]
$globalCooldown[20m;To prevent exploitations, a cooldown is in effect for opening all purchasable chests! Try again in \`%time%\`]`
})
 
bot.command({
name: "buy-lucky",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
$setGlobalUserVar[lucky;$sum[$getGlobalUserVar[lucky;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>249;Need $250 in your wallet, try withrawing it first.]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Lucky Chest]
$description[You bought a lucky chest for $250!
Open it and press your luck for a chance to get the $5,000 lucky pot! Goodluck!
]
$footer[Usage: $getServerVar[prefix]open-lucky]`
})
 
bot.command({
name: "open-lucky",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$randomText[300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;500;1000;5000]];$authorID]
$setGlobalUserVar[lucky;$sub[$getGlobalUserVar[lucky;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[3;7]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Lucky Chest]
$description[You opened a lucky Chest!
]
$footer[💵 +$$numberSeparator[$randomText[300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;500;1000;5000]] | 🗡 +$random[3;7]xp]
$onlyIf[$getGlobalUserVar[lucky;$authorID]>=1;You cant open a chest you don't have! Try purchasing one from the shop.]
$globalCooldown[3m;To prevent exploitations, a cooldown is in effect for opening all purchasable chests! Try again in \`%time%\`]`
})
 
 
 
bot.variables({
    XP: "0",
    Bank: "0",
    Wallet: "0",
    psuffix: '0',
    tv: "0",
    duffle: '0',
    bag: "0",
    smartphone: "0",
    laptop: "0",
    car: "0",
    truck: "0",
    helicopter: "0",
    apartment: "0",
    house: "0",
    mansion: "0",
    DailyChest: "0",
    lucky: "0",
    spiteful: "0",
})

bot.command({
name: "rob",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;750]];$authorID]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[0;750]];$mentioned[1]]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[50;75];$authorID]]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$mentioned[1]];$random[50;75]];$mentioned[1]]
$color[RANDOM]
$thumbnail[$userAvatar[$authorID]]
$title[$username robbed $username[$mentioned[1]]]
$description[
$addField[$username;
💵 +$$random[0;750]
🗡 +$random[50;75]xp
Total: $$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;750]] | $sum[$getGlobalUserVar[XP;$authorID];$random[50;75]]xp
]
$addField[$username[$mentioned[1]];
Total: $$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[0;750]] | $sub[$getGlobalUserVar[XP;$mentioned[1]];$random[50;75]]xp
]]
$footer[💵 -$$random[0;750] | 🗡 -$random[50;75]xp]
$globalCooldown[15m;You can rob someone again in %time%]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=750;Your wallet needs to contain at least $750 to rob someone.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=75;You need at least 75xp to rob someone.]
$onlyIf[$getGlobalUserVar[XP;$mentioned[1]]>=25;They need at least 25xp]
$onlyIf[$getGlobalUserVar[Wallet;$mentioned[1]]>=750;Their wallet needs to contain at least $750]
$onlyIf[$isBot[$mentioned[1;yes]]!=true;**⛔ You can't rob discord bots**]
$onlyIf[$mentioned[1]!=$authorID;**⛔ You can't rob yourself**]
$onlyIf[$mentioned[1]!=;**⛔ Mention someone to rob**]`
})
 
 
//Steal from someones bank account and XP base
bot.command({
name: "steal",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[250;2500]];$authorID]
$setGlobalUserVar[Bank;$sub[$getGlobalUserVar[Bank;$mentioned[1]];$random[250;2500]];$mentioned[1]]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[75;150]];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$mentioned[1]];$random[75;150]];$mentioned[1]]
$color[RANDOM]
$thumbnail[$userAvatar[$authorID]]
$title[$username stole from $username[$mentioned[1]]'s bank]
$description[
$addField[$username;
💵 +$$random[1000;2500]
🗡 +$random[75;150]xp
Total: $$sum[$getGlobalUserVar[Wallet;$authorID];$random[1000;2500]] | $sum[$getGlobalUserVar[XP;$authorID];$random[75;150]]xp
]
$addField[$username[$mentioned[1]];
Total: $$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[1000;2500]] | $sub[$getGlobalUserVar[XP;$mentioned[1]];$random[75;150]]xp
]]
$footer[💵 -$$random[1000;2500] | 🗡 -$random[75;150]xp]
$globalCooldown[30m;You can steal from someone's bank account again in %time%]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=1000;You need at least 1,000 XP to steal from someone's bank account]
$onlyIf[$getGlobalUserVar[XP;$mentioned[1]]>=500;They need at least 500 XP to be sapped from!]
$onlyIf[$getGlobalUserVar[Bank;$mentioned[1]]>=7500;Their bank needs to contain at least $7,500 to be stolen from.]
$onlyIf[$isBot[$mentioned[1]]!=true;You can't steal from discord bots]
$onlyIf[$mentioned[1]!=$authorID;You can't rob yourself lol]
$onlyIf[$mentioned[1]!=;Mention someone to steal from thier bank account. Try this: \`$getServerVar[prefix]steal @user\`]`
})
 
bot.command({
name: "search",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[20;60]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[1;5]];$authorID]
$title[Search]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[$username, $randomText[you looked under the welcome mat.;you went searching thru your mom's purse while she was asleep.;you're hungry so you decided to search thru the dumpster behind the Subway.;you searched your dads truck very thoroughly.;your friends came over and when one of them went to the bathroom, you searched thru his coat pockets.]
]
$footer[💵 +$$random[20;60] | 🗡 +$random[1;5]xp]
$globalCooldown[35s;Looking for a little loose change? You're going to have to try again in %time%]`
})
 
bot.command({
name: "scrap-car",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[11000;16000]];$authorID]
$setGlobalUserVar[car;$sub[$getGlobalUserVar[car;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[260;300]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🚗 Scrapped]
$description[
Nice $username! You scrapped a car for its parts and sold them for a profit!
]
$footer[💵 +$$numberSeparator[$random[11000;16000]] | 🗡 +$random[260;300]xp]
$globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[car;$authorID]>=1;You need at least 1 \`Car\` in your inventory to scrap]`
})
 
bot.command({
name: "scrap-helicopter",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[22000;29000]];$authorID]
$setGlobalUserVar[helicopter;$sub[$getGlobalUserVar[helicopter;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[360;435]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🚁 Scrapped]
$description[
Nice $username! You scrapped a helicopter for its parts and sold them for a profit!
]
$footer[💵 +$$numberSeparator[$random[22000;29000]] | 🗡 +$random[360;435]xp]
$globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[helicopter;$authorID]>=1;You need at least 1 \`Helicopter\` in your inventory to scrap]`
})
 
 
bot.command({
name: "scrap-truck",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[16500;22000]];$authorID]
$setGlobalUserVar[truck;$sub[$getGlobalUserVar[truck;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[310;380]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🚚 Scrapped]
$description[
Nice $username! You scrapped a truck for its parts and sold them for a profit!
]
$footer[💵 +$$numberSeparator[$random[16500;22000]] | 🗡 +$random[310;380]xp]
$globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[truck;$authorID]>=1;You need at least 1 \`Truck\` in your inventory to scrap]`
})
 
bot.command({
name: "flip-house", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[125000;150000]];$authorID]
$setGlobalUserVar[house;$sub[$getGlobalUserVar[house;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[550;650]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🏡 Flipped]
$description[
Nice job $username! You flipped your house and sold it for a profit!
]
$footer[💵 +$$numberSeparator[$random[125000;150000]] | 🗡 +$random[550;650]xp]
$globalCooldown[12h;Real estate investors aren't made of money and they can only buy your assets once every 12 hours! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[house;$authorID]>=1;You need to have bought at least 1 \`House\` to flip]` 
})
 
bot.command({
name: "flip-apartment", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[70000;95000]];$authorID]
$setGlobalUserVar[apartment;$sub[$getGlobalUserVar[apartment;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[425;525]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🏫 Flipped]
$description[
Nice job $username! You flipped your apartment and sold it for a profit!
]
$footer[💵 +$$numberSeparator[$random[70000;95000]] | 🗡 +$random[425;525]xp]
$globalCooldown[12h;Real estate investors aren't made of money and they can only buy your assets once every 12 hours! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[apartment;$authorID]>=1;You need to have bought at least 1 \`Apartment\` to flip]` 
})
 
bot.command({
name: "fish",
code: `$color[RANDOM]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[50;100]]]
$title[$username is fishing]
$description[You fished a $randomText[🥿;👠;👡;👢;👞;👟;🥾;🦀;🦑;🐙;🦞;🦐;🐠;🐟;🐡;🐬;🦈;🐳;🐋;🐊;🦢;🦆] and you get $$random[50;100]]
$globalCooldown[15m;**⏳ You can fish again in %time%**]`
})
 
 
bot.command({
name: "lb-bank",
code: `$title[**__🏦 Bank leaderboard__** 
$globalUserLeaderboard[Bank;asc]]
$color[RANDOM]
$footer[You have $$numberSeparator[$getGlobalUserVar[Bank;$authorID]] 💵 in your bank]`
})
 
 
bot.command({
name: "lb-wallet",
code: `$title[**__👛 Wallet leaderboard__**
$globalUserLeaderboard[Wallet;asc]]
$color[RANDOM]
$footer[You have $$numberSeparator[$getGlobalUserVar[Wallet;$authorID]] 💵 in your wallet]`
})
 
 
//Resets user money for all guilds
bot.command({
name: "reset", 
code: `$resetGlobalUserVar[Wallet]
$resetGlobalUserVar[Bank]
$resetGlobalUserVar[XP]
$title[Reset]
$description[Economy has been reset for all guilds]
$footer[Economy Commands]
$color[RANDOM]
$onlyForIDs[921093686148886619;**⛔ You're not the owner of this bot**]` 
})

bot.command({
name: "add-money", 
code: `$setGlobalUserVar[Wallet;$sum[$getUserVar[Wallet];$noMentionMessage];$mentioned[1]]
$title[Money Added]
$description[Added **$noMentionMessage** 💲 to <@$mentioned[1]>]
$footer[Add-money]
$color[RANDOM]

$onlyIf[$noMentionMessage!=;**⛔ Please enter a amount of money to add.**]
$onlyIf[$mentioned[1]!=;**⛔ Please mention someone.**]
$onlyPerms[admin;**⛔ You can't do this.**]` 
})

bot.command({
name: "remove-money", 
code: `$setGlobalUserVar[Wallet;$sub[$getUserVar[Wallet];$noMentionMessage];$mentioned[1]]
$title[Money Removed]
$description[Removed **$noMentionMessage** 💲 to <@$mentioned[1]>]
$footer[Remove-money]
$color[RANDOM]

$onlyIf[$noMentionMessage!=;**⛔ Please enter a amount of money to remove.**]
$onlyIf[$mentioned[1]!=;**⛔ Please mention someone.**]
$onlyPerms[admin;**⛔ You can't do this.**]` 
})

bot.command({
name: "setprefix",
code: `$if[$serverChannelExists[$getServerVar[modlogs]]==true]
$channelSendMessage[$getServerVar[modlogs];<@$authorID>{title:Mod Logs}{field:Action:Changed Prefix}{field:User:$username}{field:New prefix : \`$message\`}{thumbnail:$userAvatar}{color:RANDOM}]
$endif

$author[Success;https://cdn.discordapp.com/attachments/760236507310850102/780441559468474408/6286_tada_animated.gif]
$description[**Done, my new prefix is** \`$message\`]
$color[RANDOM]
$setServerVar[prefix;$message]
$onlyIf[$message[1]!=;**You have to put a prefix, example** \`$getServerVar[prefix]setprefix /\`]
$onlyPerms[admin;:x: **You dont have** \`ADMIN\` **perms**]`
})