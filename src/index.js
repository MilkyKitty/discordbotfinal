require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(process.env.TOKEN);

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
	
});


client.on('messageCreate', (receivedMessage) => {
	if (receivedMessage.author.id === "1101607885693276253") return;

    if (receivedMessage.content === '-newseason'){
		processCommand(receivedMessage);
	}
})


//let tomorrow = new Date().setDate(new Date().getDate() + 1);
//let nextWeek = new Date().setDate(new Date().getDate() + 7);

//These times are in UTC-3
let SEATriceratops = "SEA Triceratops - Every Thursday, April 27, 2023 11:00 PM";
let ASIANunubis = "ASIA Nunubis - Every Tuesday, May 2, 2023 11:00 PM and Friday, April 28, 2023 11:00 PM";
let EUPterosaur = "EU Pterosaur - Every Friday, April 28, 2023 6:00 AM";
let EUBlaze = "EU Blaze - Every Monday, May 1, 2023 5:00 AM and Friday, April 28, 2023 5:00 AM";
let NAAllosaurus = "NA Allosaurus - Every Friday, April 28, 2023 12:00 PM";
let NATootBird = "NA Toot Bird - Every Day Friday, April 28, 2023 12:00 PM";
let GLOBALTRex = "GLOBAL T. Rex - Every Friday, April 28, 2023 12:00 PM";
let JAPAN = "JAPAN - Every Tuesday, May 9, 2023 11:00 PM";
let KOREA = "KOREA - Every Thursday, April 27, 2023 11:00 PM";
let THAILAND = "THAILAND - Unknown Every Friday";

let allEvents = []
allEvents.push(SEATriceratops);
allEvents.push(ASIANunubis);
allEvents.push(EUPterosaur);
allEvents.push(EUBlaze);
allEvents.push(NAAllosaurus);
allEvents.push(NATootBird);
allEvents.push(GLOBALTRex);
allEvents.push(JAPAN);
allEvents.push(KOREA);
allEvents.push(THAILAND);

function processCommand(receivedMessage) {
    let today = new Date();
    let allUpdatedEvents = [];
    console.log("Today: " + today);	
	for (let i = 0; i < allEvents.length; i++) {		
		let element = allEvents[i];
		if (element.toLowerCase().includes("unknown")){
			allUpdatedEvents.push(element);
			continue;
		}
		let name = element.split(" - ")[0];
		
		let oneElement = element.toLowerCase().split('and');
		
		if (oneElement.length > 1){
			let multipleDatesArray = [];
			for (let j = 0; j < oneElement.length; j++) {
				let multipleDates = oneElement[j];
				let everyWeek = !element.toLowerCase().includes("every day");
				let occurence = everyWeek ? "(weekly)" : "(daily)";
				let date = new Date(multipleDates);
				while (date < today) {
					// code block to be executed
					if (everyWeek){
						date.setDate(date.getDate() + 7);
					} else {
						date.setDate(date.getDate() + 1);
					}
				}
				multipleDatesArray.push("<t:" + date.getTime() / 1000 + ":F> " + occurence);
			}
			allUpdatedEvents.push(name + " - " + multipleDatesArray.join(" and "));
		} else {
			let everyWeek = !element.toLowerCase().includes("every day");
			let occurence = everyWeek ? "(weekly)" : "(daily)";
			let date = new Date(element);
			while (date < today) {
				// code block to be executed
				if (everyWeek){
					date.setDate(date.getDate() + 7);
				} else {
					date.setDate(date.getDate() + 1);
				}
			}
			allUpdatedEvents.push(name + " - " + "<t:" + date.getTime() / 1000 + ":F> "  + occurence);
		}
	}
	
	let formatted = allUpdatedEvents.join(" \n");
	receivedMessage.channel.send(formatted);
	receivedMessage.channel.send("Please tell MilkyKitty#0169 if any of these are wrong :)\nThis command only displays the next available hunting season, it ignores seasons currently active");
}