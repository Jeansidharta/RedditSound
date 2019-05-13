let soundValue = document.getElementById("sound-value");
let slider = document.getElementById("slider");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse)=>{
	if(!sender.tab){
		if(request.message == "volume"){
			let volume = Math.floor(Number(request.volume) * 100);
			soundValue.innerText = volume + "%";
			slider.value = volume;
		}
	}
});

slider.addEventListener("input", ()=>{
	slider.value = Number(slider.value);
	soundValue.innerText = slider.value + "%";
	chrome.runtime.sendMessage({message: "set volume", volume: slider.value / 100});
});

async function main(){
	chrome.runtime.sendMessage({message: "get volume"});
} main();