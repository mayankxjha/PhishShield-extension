import {getActiveTabURL} from "./utils.js";
// adding a new bookmark row to the popup
const addNewLink = (links, link) => {
    const linkTitleElement = document.createElement("div");
    // const controlsElement = document.createElement("div");
    const newLinkElement = document.createElement("div");

    linkTitleElement.textContent = link;
    linkTitleElement.className = "link-title";
    // controlsElement.className = "bookmark-controls";

    // setBookmarkAttributes("play", onPlay, controlsElement);
    // setBookmarkAttributes("delete", onDelete, controlsElement);

    // newLinkElement.id = "link-" + bookmark.time;
    newLinkElement.className = "link";
    // newLinkElement.setAttribute("timestamp", bookmark.time);

    newLinkElement.append(linkTitleElement);
    // newLinkElement.appendChild(controlsElement);
    links.append(newLinkElement);
};

const viewLinks = (currentLinks=[]) => {
    const linksElement = document.getElementById("links");
    linksElement.innerHTML = "";

    if (currentLinks.length > 0) {
            console.log("link:")
        for (let i = 0; i < currentLinks.length; i++) {
            const link = currentLinks[i];
            addNewLink(linksElement, link);
        }
    }
    else {
        // console.log(currentLinks)
        linksElement.innerHTML = '<i class="row">No links to show.</i>';
    }
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("inbox/")[1];

    const currentMail = queryParameters

    if (activeTab.url.includes("mail.google.com/mail/u/") && currentMail) {
        chrome.storage.local.get([currentMail], (data) => {
            const currentMailLinks = data[currentMail] ? JSON.parse(data[currentMail]) : [];
            console.log(data[currentMail])
            viewLinks(currentMailLinks);
        });
    } else {
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = '<div class="title">This is not a mail page</div>';
    }
});
