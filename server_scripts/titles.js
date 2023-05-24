onEvent("player.logged_in", event => {
	event.player.persistentData.tripperstitles = JSON.stringify({
		"biome": "",
		"dimension": ""
	})
})

onEvent("player.tick", event => {
	let biome = event.player.block.biomeId.toString()
	let dimension = event.player.block.dimension.toString()
	let data = JSON.parse(event.player.persistentData.tripperstitles)

	let newdim = ""
	if (data.biome!=biome && (global.trippersTitles==undefined||global.trippersTitles.biomeTitles!=false)) event.server.runCommandSilent(`title ${event.player.name.string} subtitle "${Text.translate("biome."+biome.split(":")[0]+"."+biome.split(":")[1]).string}"`)
	if (data.dimension!=dimension && (global.trippersTitles==undefined||global.trippersTitles.dimensionTitles!=false)) newdim = Text.translate("dimension."+dimension.split(":")[0]+"."+dimension.split(":")[1]).string
	if (data.biome!=biome||newdim) event.server.runCommandSilent(`title ${event.player.name.string} title "${newdim}"`)

	event.player.persistentData.tripperstitles = JSON.stringify({
		"biome": biome,
		"dimension": dimension
	})
})