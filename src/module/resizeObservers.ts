import { debug, getBodyData } from "./utils.js";

function moveSidebarToTab(html: JQuery) {
	if (html.find(".sheet-navigation #sidebar-tab").length === 0) {
		const sidebarTabButton = $(
			`<a class="item" id="sidebar-tab" data-tab="sidebar" title="${game.i18n.localize(
				"pf2e-mobile-sheet.sidebar-tab",
			)}"><i class="fa-solid fa-bars"></i></a>`,
		);
		const afterButton = html.find(".sheet-navigation .panel-title");
		sidebarTabButton.insertAfter(afterButton);
	}

	const aside = html.find("aside");

	if (html.find(".sheet-content .tab.sidebar").length === 0) {
		const sidebarTab = $(`<div class="tab sidebar" data-group="primary" data-tab="sidebar"/>`);
		sidebarTab.append(aside.detach());
		html.find(".sheet-content").append(sidebarTab);
	} else {
		html.find(".sheet-content .tab.sidebar").append(aside.detach());
	}
}

const characterSheetResizeObserver = new ResizeObserver((entries) => {
	for (const entry of entries) {
		if (!entry.target.id.startsWith("CharacterSheetPF2e")) continue;
		const html = $(entry.target) as JQuery<HTMLElement>;
		if (
			(entry.contentRect.width < 745 || getBodyData("force-mobile-window") === true) &&
			!html.hasClass("mobile")
		) {
			debug(false, "sidebar found", html.find("aside").length);

			moveSidebarToTab(html);

			html.addClass("mobile");
			debug(false, "mobile", entry);
			debug(false, "sidebar found", html.find("aside").length);
		} else if (
			(entry.contentRect.width >= 745 || getBodyData("force-mobile-window") === false) &&
			html.hasClass("mobile")
		) {
			debug(false, "sidebar found off", html.find("aside").length);
			html.removeClass("mobile");
			const sidebar = html.find(".tab.sidebar aside");
			html.find(".window-content form").prepend(sidebar.detach());
			const sidebarTab: JQuery = html.find(".tab.sidebar.active");
			if (sidebarTab.length > 0) {
				sidebarTab.removeClass("active");
				html.find('a[data-tab="character"]')[0].click();
			}
			debug(false, "no mobile");
			debug(false, "sidebar found", html.find("aside").length);
		}
	}
});

const vehicleSheetResizeObserver = new ResizeObserver((entries) => {
	for (const entry of entries) {
		if (!entry.target.id.startsWith("VehicleSheetPF2e")) continue;
		const html = $(entry.target) as JQuery<HTMLElement>;
		if (
			(entry.contentRect.width < 585 || getBodyData("force-mobile-window") === true) &&
			!html.hasClass("mobile")
		) {
			debug(false, "sidebar found", html.find("aside").length);

			moveSidebarToTab(html);
			html.addClass("mobile");
			debug(false, "mobile", entry);
			debug(false, "sidebar found", html.find("aside").length);
		} else if (
			(entry.contentRect.width >= 585 || getBodyData("force-mobile-window") === false) &&
			html.hasClass("mobile")
		) {
			debug(false, "sidebar found off", html.find("aside").length);
			html.removeClass("mobile");
			const sidebar = html.find(".tab.sidebar aside");
			html.find(".window-content form").prepend(sidebar.detach());
			const sidebarTab: JQuery = html.find(".tab.sidebar.active");
			if (sidebarTab.length > 0) {
				sidebarTab.removeClass("active");
				html.find('a[data-tab="details"]')[0].click();
			}
			debug(false, "no mobile");
			debug(false, "sidebar found", html.find("aside").length);
		}
	}
});

const settingsResizeObserver = new ResizeObserver((entries) => {
	for (const entry of entries) {
		const html = $(entry.target);
		if (
			(entry.contentRect.width < 534 || getBodyData("force-mobile-window") === true) &&
			!html.hasClass("mobile")
		) {
			html.addClass("mobile");
			const content = html.find("section.window-content > div:not(#mps-view-group).flexrow");
			const form = html.find(".categories");
			const scrollable = html.find(".scrollable");
			const sidebar = html.find("aside.sidebar");
			const footer = form.find("footer");
			if (content.length === 1) {
				content.removeClass("flexrow");
				content.addClass("flexcol");
			}
			content.append(scrollable);
			form.append(scrollable.children());
			scrollable.append(sidebar);
			scrollable.append(form);
			footer.prepend(html.find(".reset-all"));
			footer.addClass("flexrow");
			content.append(footer);
			const submitButton: JQuery = footer.find("button[type=submit]");
			submitButton.removeAttr("type").attr("type", "button");
			submitButton.on("click", () => form.trigger("submit"));
		} else if (
			(entry.contentRect.width >= 534 || getBodyData("force-mobile-window") === false) &&
			html.hasClass("mobile")
		) {
			html.removeClass("mobile");
			const content = html.find("section.window-content > div:not(#mps-view-group).flexcol");
			if (content.length === 1) {
				content.removeClass("flexcol");
				content.addClass("flexrow");
			}
			const form = html.find(".categories");
			const scrollable = html.find(".scrollable");
			const sidebar = html.find("aside.sidebar");
			const footer = html.find("footer");
			sidebar.append(html.find(".reset-all"));
			content.append(sidebar);
			content.append(form);
			scrollable.append(form.children());
			form.append(scrollable);
			form.append(footer);
			// ui.windows[html.data("appid")].render(false);
		}
	}
});
Hooks.on("closeSettingsConfig", (_app: Application, html: JQuery) => {
	settingsResizeObserver.unobserve(html[0]);
});

Hooks.on("closeCharacterSheetPF2e", (_app: Application, html: JQuery) => {
	characterSheetResizeObserver.unobserve(html[0]);
});
Hooks.on("closeVehicleSheetPF2e", (_app: Application, html: JQuery) => {
	vehicleSheetResizeObserver.unobserve(html[0]);
});
Hooks.on("renderSettingsConfig", (_app: Application, html: JQuery) => {
	html = html.closest(".app");
	settingsResizeObserver.observe(html[0]);
});

Hooks.on("renderCharacterSheetPF2e", (_app: Application, html: JQuery) => {
	html = html.closest(".app");
	characterSheetResizeObserver.observe(html[0]);
	if (html.hasClass("mobile")) {
		moveSidebarToTab(html);
	}
});

Hooks.on("renderVehicleSheetPF2e", (_app: Application, html: JQuery) => {
	html = html.closest(".app");
	vehicleSheetResizeObserver.observe(html[0]);
	if (html.hasClass("mobile")) {
		moveSidebarToTab(html);
	}
});
