function addActiveToNav() {
	let navBar = document.querySelector("ul.navbar-nav");
	let pageHref = "/" + window.location.href.split("/").pop();

	let childElements = navBar.children;
	for (let listElement of childElements) {
		let aElement = listElement.children[0];
		if (aElement.href.endsWith(pageHref)) {
			listElement.classList.add("active");
			break;
		}
	}
}

window.addEventListener("load", addActiveToNav, false);