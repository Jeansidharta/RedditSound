const defaultVolume = 0.5;

let upvoteMedia = document.createElement("audio");
let upvoteMediaRev = document.createElement("audio");
let downvoteMedia = document.createElement("audio");
let downvoteMediaRev = document.createElement("audio");
upvoteMedia.src="./upvote-modified.mp3";
upvoteMediaRev.src="./upvote-reversed.mp3";
downvoteMedia.src="./downvote-modified.mp3";
downvoteMediaRev.src="./downvote-reversed.mp3";

let volume = defaultVolume;

function playSound(sound){
	sound.volume = volume;
	sound.currentTime = 0;
	sound.play();
}

function getVolume(){
	return new Promise((resolve, reject)=>{
		chrome.storage.local.get("volume", (value)=>{
			if(value.volume === undefined) reject("volume was not defined");
			else resolve(value.volume);
		});
	});
}

function setVolume(value){
	volume = value;
	chrome.storage.local.set({volume});
}

(async ()=>{
	volume = await getVolume();
	if(!volume || volume.constructor !== Number){
		volume = defaultVolume;
		setVolume(defaultVolume);
	}
})();

chrome.runtime.onMessage.addListener((request, sender)=>{
	if(!sender.tab){
		if(request.message == "get volume")
			chrome.runtime.sendMessage({message : "volume", volume});
		else if(request.message == "set volume")
			setVolume(request.volume);
	}
	else{
		if(request.message == "upvote on")
			playSound(upvoteMedia);
		else if(request.message == "downvote on")
			playSound(downvoteMedia);
		else if(request.message == "upvote off")
			playSound(upvoteMediaRev);
		else if(request.message == "downvote off")
			playSound(downvoteMediaRev);
	}
});