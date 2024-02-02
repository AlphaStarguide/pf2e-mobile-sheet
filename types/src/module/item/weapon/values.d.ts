declare const WEAPON_CATEGORIES: readonly ["unarmed", "simple", "martial", "advanced"];
declare const MELEE_WEAPON_GROUPS: Set<"dart" | "knife" | "axe" | "brawling" | "club" | "flail" | "hammer" | "pick" | "polearm" | "shield" | "spear" | "sword">;
/** Groups that will be forced as ranged weapons */
declare const MANDATORY_RANGED_GROUPS: Set<"bomb" | "bow" | "crossbow" | "firearm" | "sling">;
declare const WEAPON_GROUPS: Set<"dart" | "knife" | "axe" | "brawling" | "club" | "flail" | "hammer" | "pick" | "polearm" | "shield" | "spear" | "sword" | "bomb" | "bow" | "crossbow" | "firearm" | "sling">;
declare const WEAPON_PROPERTY_RUNE_TYPES: Set<"holy" | "unholy" | "vorpal" | "astral" | "speed" | "ancestralEchoing" | "anchoring" | "ashen" | "authorized" | "bane" | "bloodbane" | "bloodthirsty" | "brilliant" | "called" | "coating" | "conducting" | "corrosive" | "crushing" | "cunning" | "dancing" | "deathdrinking" | "decaying" | "demolishing" | "disrupting" | "earthbinding" | "energizing" | "extending" | "fanged" | "fearsome" | "flaming" | "flurrying" | "frost" | "ghostTouch" | "giantKilling" | "greaterGiantKilling" | "greaterAnchoring" | "greaterAshen" | "greaterAstral" | "greaterBloodbane" | "greaterBrilliant" | "greaterCorrosive" | "greaterCrushing" | "greaterDecaying" | "greaterDisrupting" | "greaterExtending" | "greaterFanged" | "greaterFearsome" | "greaterFlaming" | "greaterFrost" | "greaterHauling" | "greaterImpactful" | "greaterRooting" | "greaterShock" | "greaterThundering" | "grievous" | "hauling" | "hopeful" | "hooked" | "impactful" | "impossible" | "keen" | "kinWarding" | "majorFanged" | "majorRooting" | "merciful" | "pacifying" | "returning" | "rooting" | "serrating" | "shifting" | "shock" | "spellStoring" | "swarming" | "thundering" | "trueRooting" | "underwater" | "wounding">;
declare const THROWN_RANGES: Set<20 | 10 | 15 | 30 | 40 | 60 | 100 | 80>;
declare const WEAPON_RANGES: Set<20 | 10 | 15 | 30 | 40 | 60 | 50 | 100 | 200 | 80 | 70 | 90 | 110 | 120 | 140 | 150 | 180 | 240 | 300>;
export { MANDATORY_RANGED_GROUPS, MELEE_WEAPON_GROUPS, THROWN_RANGES, WEAPON_CATEGORIES, WEAPON_GROUPS, WEAPON_PROPERTY_RUNE_TYPES, WEAPON_RANGES, };
