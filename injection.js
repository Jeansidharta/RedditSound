document.body.addEventListener("click", (event)=>{
	for(let node = event.target; node != null; node = node.parentNode){
		if(node.tagName == "BUTTON"){
			if(node.getAttribute("aria-label") === "upvote"){
				if(node.getAttribute("aria-pressed") === "false")
					chrome.runtime.sendMessage({message : "upvote on"});
				else
					chrome.runtime.sendMessage({message : "upvote off"});
			}
			else if(node.getAttribute("aria-label") === "downvote"){
				if(node.getAttribute("aria-pressed") === "false")
					chrome.runtime.sendMessage({message : "downvote on"});
				else
					chrome.runtime.sendMessage({message : "downvote off"});
			}
		}
	}
});