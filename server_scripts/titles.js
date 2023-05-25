global.kjspkgCompatLayer.legacyOnEvent("player.logged_in", event => {
	event.player.persistentData.tripperstitles = JSON.stringify({
		"biome": "",
		"dimension": ""
	})
})

global.kjspkgCompatLayer.legacyOnEvent("player.tick", event => {
	let biome = event.player.block.biomeId.toString()
	let dimension = event.player.block.dimension.toString()

	let dimension_key = "dimension."+dimension.split(":")[0]+"."+dimension.split(":")[1]
	let biome_key = "biome."+biome.split(":")[0]+"."+biome.split(":")[1]

	let data = JSON.parse(event.player.persistentData.tripperstitles)

	let newdim = ""
	if (data.biome!=biome && (global.trippersTitles==undefined||global.trippersTitles.biomeTitles!=false)) event.server.runCommandSilent(`title ${event.player.name.string} subtitle {"text":"${Text.translate(biome_key).string}","color":"${Text.translate(biome_key+".color").string}"}`)
	if (data.dimension!=dimension && (global.trippersTitles==undefined||global.trippersTitles.dimensionTitles!=false)) newdim = Text.translate(dimension_key).string
	if (data.biome!=biome||newdim) event.server.runCommandSilent(`title ${event.player.name.string} title {"text":"${newdim}","color":"${Text.translate(dimension_key+".color").string}"}`)

	event.player.persistentData.tripperstitles = JSON.stringify({
		"biome": biome,
		"dimension": dimension
	})
})