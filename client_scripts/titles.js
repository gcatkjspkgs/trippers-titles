const $Minecraft = global.kjspkgCompatLayer.legacyJava("net.minecraft.client.Minecraft")

const _MC_INSTANCE = $Minecraft.getInstance()
let tripperData = {
	"biome": "",
	"dimension": ""
}

global.kjspkgCompatLayer.legacyOnEvent("client.tick", event => {
	let biome = event.player.block.biomeId.toString()
	let dimension = event.player.block.dimension.toString()

	let dimension_key = ""
	let biome_key = ""

	if (tripperData.dimension!=dimension && (global.trippersTitles==undefined||global.trippersTitles.dimensionTitles!=false)) dimension_key = "dimension."+dimension.split(":")[0]+"."+dimension.split(":")[1]
	if (tripperData.biome!=biome && (global.trippersTitles==undefined||global.trippersTitles.biomeTitles!=false)) biome_key = "biome."+biome.split(":")[0]+"."+biome.split(":")[1]

	if (biome_key) {
		let biome_color = Text.translate(biome_key+".color").string
		_MC_INSTANCE.gui.setTitles(
			null,
			Text.translate(biome_key).color(biome_color==biome_key+".color" ? "#ffffff" : biome_color),
			-1,
			-1,
			-1
		)
	}

	if (dimension_key || biome_key) {
		let dimension_color = Text.translate(dimension_key+".color").string
		_MC_INSTANCE.gui.setTitles(
			Text.translate(dimension_key).color(dimension_color==dimension_key+".color" ? "#ffffff" : dimension_color),
			null,
			-1,
			-1,
			-1
		)
	}
	
	tripperData = {
		"biome": biome,
		"dimension": dimension
	}
})