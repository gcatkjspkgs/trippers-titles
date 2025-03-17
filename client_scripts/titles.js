const $Minecraft = global.kjspkgCompatLayer.legacyJava("net.minecraft.client.Minecraft")

const _MC_INSTANCE = $Minecraft.getInstance()

let lastBiome = ""
let lastDimension = ""
let ticksSinceShown = 110
let ticksSinceDimensionShown = 0
let stopShowingDimension = false

global.kjspkgCompatLayer.legacyOnEvent("client.tick", event => {
	let biome = event.player.block.biomeId.toString()
	let dimension = event.player.block.dimension.toString()

	let dimensionKey = ""
	let biomeKey = ""
    let newDimension = lastDimension != dimension
    let newBiome = lastBiome != biome

	if (global.trippersTitles == undefined || global.trippersTitles.dimensionTitles != false) dimensionKey = "dimension."+dimension.split(":")[0]+"."+dimension.split(":")[1]
	if (global.trippersTitles == undefined || global.trippersTitles.biomeTitles != false) biomeKey = "biome."+biome.split(":")[0]+"."+biome.split(":")[1]

	if (newBiome) {
		let biomeColor = Text.translate(biomeKey+".color").string
		let subtitle = Text.translate(biomeKey).color(biomeColor == biomeKey+".color" ? "#ffffff" : biomeColor)
		
        if (subtitle.string) {
            if (global.kjspkgCompatLayer.versionId==6) _MC_INSTANCE.gui.setTitles(
                null,
                subtitle,
                -1,
                -1,
                -1
            )
            else _MC_INSTANCE.gui.setSubtitle(subtitle)
        }
	}

	if (newDimension || newBiome) {
        if (newDimension) {
            ticksSinceDimensionShown = -1
            stopShowingDimension = false
        }

		let dimensionColor = Text.translate(dimensionKey+".color").string
		let title = Text.translate(stopShowingDimension ? "" : dimensionKey).color(dimensionColor == dimensionKey+".color" ? "#ffffff" : dimensionColor)

        if (!newDimension || title.string) {
            if (global.kjspkgCompatLayer.versionId==6) {
                _MC_INSTANCE.gui.setTitles(
                    null,
                    null,
                    10 * +(ticksSinceShown >= 110),
                    -1,
                    -1
                )
                _MC_INSTANCE.gui.setTitles(
                    title,
                    null,
                    -1,
                    -1,
                    -1
                )
            }
            else {
                _MC_INSTANCE.gui.setTimes(10 * +(ticksSinceShown >= 110), -1, -1)
                _MC_INSTANCE.gui.setTitle(title)
            }
        }
        
		ticksSinceShown = -1
	}

    if (ticksSinceDimensionShown >= 110) stopShowingDimension = true
	
	lastBiome = biome
    lastDimension = dimension
	ticksSinceShown++
    ticksSinceDimensionShown++
})