# Tripper's Titles

For people who really hate adding new mods to their modpack.

## Showcase



## Configuration

Add this to the `loaded` startup event:

```json5
global.trippersTitles = {
    biomeTitles: true, // false to disable biome titles, true by default
    dimensionTitles: true // false to disable dimension titles, true by default
}
```

## Adding dimension/biome names

Simply add a lang key that looks like this:

```json
{
    "biome.{modid}.{biomeid}": "<Biome name>",
    "dimension.{modid}.{dimensionid}": "<Dimension name>"
}
```
