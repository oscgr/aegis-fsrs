import aqueduct from '@/assets/icons/buildings/aqueduct.png'
import ar from '@/assets/icons/buildings/ar.png'
import barracks from '@/assets/icons/buildings/barracks.png'
import blacksmith from '@/assets/icons/buildings/blacksmith.png'
import cattleRanch from '@/assets/icons/buildings/cattle-ranch.png'
import cistern from '@/assets/icons/buildings/cistern.png'
import dock from '@/assets/icons/buildings/dock.png'
import farm from '@/assets/icons/buildings/farm.png'
import farmhouse from '@/assets/icons/buildings/farmhouse.png'
import forge from '@/assets/icons/buildings/forge.png'
import ger from '@/assets/icons/buildings/ger.png'
import granary from '@/assets/icons/buildings/granary.png'
import house from '@/assets/icons/buildings/house.png'
import how from '@/assets/icons/buildings/how.png'
import hc from '@/assets/icons/buildings/hunting-cabin.png'
import keep from '@/assets/icons/buildings/keep.png'
import lc from '@/assets/icons/buildings/lc.png'
import market from '@/assets/icons/buildings/market.png'
import mc from '@/assets/icons/buildings/mc.png'
import mercenaryHouse from '@/assets/icons/buildings/mercenary-house.png'
import militarySchool from '@/assets/icons/buildings/military-school.png'
import mill from '@/assets/icons/buildings/mill.png'
import monastery from '@/assets/icons/buildings/monastery.png'
import mosque from '@/assets/icons/buildings/mosque.png'
import oliveGrove from '@/assets/icons/buildings/olive-grove.png'
import outpost from '@/assets/icons/buildings/outpost.png'
import ovoo from '@/assets/icons/buildings/ovoo.png'
import pagoda from '@/assets/icons/buildings/pagoda.png'
import palisadeGate from '@/assets/icons/buildings/palisade-gate.png'
import palisade from '@/assets/icons/buildings/palisade.png'
import pasture from '@/assets/icons/buildings/pasture.png'
import pitMine from '@/assets/icons/buildings/pit.png'
import shintoShrine from '@/assets/icons/buildings/shinto-shrine.png'
import siege from '@/assets/icons/buildings/siege.png'
import stable from '@/assets/icons/buildings/stable.png'
import stoneGate from '@/assets/icons/buildings/stone-gate.png'
import tc from '@/assets/icons/buildings/tc.png'
import tollOutpost from '@/assets/icons/buildings/toll-outpost.png'
import tower from '@/assets/icons/buildings/tower.png'
import university from '@/assets/icons/buildings/university.png'
import village from '@/assets/icons/buildings/village.png'
import wall from '@/assets/icons/buildings/wall.png'
import woodenFortress from '@/assets/icons/buildings/wooden-fortress.png'
import abbasid from '@/assets/icons/flags/abbasid.png'
import byzantines from '@/assets/icons/flags/byzantines.png'
import chinese from '@/assets/icons/flags/chinese.png'
import delhi from '@/assets/icons/flags/delhi.png'
import generic from '@/assets/icons/flags/generic.png'
import japanese from '@/assets/icons/flags/japanese.png'
import malians from '@/assets/icons/flags/malians.png'
import mongol from '@/assets/icons/flags/mongol.png'
import ottomans from '@/assets/icons/flags/ottomans.png'
import rus from '@/assets/icons/flags/rus.png'

export enum BuildingType {
  ECONOMY = 'economy',
  MILITARY = 'military',
  RESEARCH = 'research',
  FORTIFIED = 'fortified',
}
export enum BuildingAge {
  I = 'I',
  II = 'II',
  III = 'III',
  IV = 'IV',
}
export enum BuildingCivGroup {
  COMMON = 'Common',
  GENERIC = 'Generic',
  MONGOL = 'Mongol',
  RUS = 'Rus',
  CHINESE = 'Chinese',
  ABBASID = 'Abbasid',
  DELHI = 'Delhi',
  MALIANS = 'Malians',
  OTTOMANS = 'Ottomans',
  JAPANESE = 'Japanese',
  BYZANTINES = 'Byzantines',
}
export interface Building {
  name: string
  shortcut1: number
  shortcut2: number
  icon: string
  type: BuildingType
  age: BuildingAge
  groups: BuildingCivGroup[]
}

export const BuildingCivGroups = [
  { name: BuildingCivGroup.GENERIC, icon: generic, nbCivs: 5 },
  { name: BuildingCivGroup.MONGOL, icon: mongol, nbCivs: 1 },
  { name: BuildingCivGroup.RUS, icon: rus, nbCivs: 1 },
  { name: BuildingCivGroup.CHINESE, icon: chinese, nbCivs: 2 },
  { name: BuildingCivGroup.ABBASID, icon: abbasid, nbCivs: 2 },
  { name: BuildingCivGroup.DELHI, icon: delhi, nbCivs: 1 },
  { name: BuildingCivGroup.MALIANS, icon: malians, nbCivs: 1 },
  { name: BuildingCivGroup.OTTOMANS, icon: ottomans, nbCivs: 1 },
  { name: BuildingCivGroup.JAPANESE, icon: japanese, nbCivs: 1 },
  { name: BuildingCivGroup.BYZANTINES, icon: byzantines, nbCivs: 1 },
] satisfies { name: BuildingCivGroup, icon: string, nbCivs: number }[]

const Buildings = [
  // Age I
  {
    name: 'House',
    shortcut1: 0,
    shortcut2: 0,
    icon: house,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Ovoo',
    shortcut1: 0,
    shortcut2: 0,
    icon: ovoo,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.MONGOL],
  },
  {
    name: 'Farmhouse',
    shortcut1: 0,
    shortcut2: 0,
    icon: farmhouse,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.JAPANESE],
  },
  {
    name: 'Mill',
    shortcut1: 0,
    shortcut2: 1,
    icon: mill,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Ger',
    shortcut1: 0,
    shortcut2: 1,
    icon: ger,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.MONGOL],
  },
  {
    name: 'Hunting Cabin',
    shortcut1: 0,
    shortcut2: 1,
    icon: hc,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.RUS],
  },
  {
    name: 'Lumber Camp',
    shortcut1: 0,
    shortcut2: 2,
    icon: lc,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Mining Camp',
    shortcut1: 0,
    shortcut2: 3,
    icon: mc,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Forge',
    shortcut1: 0,
    shortcut2: 3,
    icon: forge,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.JAPANESE],
  },
  {
    name: 'Farm',
    shortcut1: 0,
    shortcut2: 4,
    icon: farm,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE],
  },
  {
    name: 'Pasture',
    shortcut1: 0,
    shortcut2: 4,
    icon: pasture,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.MONGOL],
  },
  {
    name: 'Olive Grove',
    shortcut1: 0,
    shortcut2: 4,
    icon: oliveGrove,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Barracks',
    shortcut1: 0,
    shortcut2: 5,
    icon: barracks,
    type: BuildingType.MILITARY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.COMMON],
  },
  {
    name: 'Dock',
    shortcut1: 0,
    shortcut2: 6,
    icon: dock,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.COMMON],
  },
  {
    name: 'Stable',
    shortcut1: 0,
    shortcut2: 7,
    icon: stable,
    type: BuildingType.MILITARY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.MONGOL],
  },
  {
    name: 'Village',
    shortcut1: 0,
    shortcut2: 7,
    icon: village,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.CHINESE],
  },
  {
    name: 'House of Wisdom',
    shortcut1: 0,
    shortcut2: 7,
    icon: how,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.ABBASID],
  },
  {
    name: 'Mosque',
    shortcut1: 0,
    shortcut2: 7,
    icon: mosque,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.DELHI],
  },
  {
    name: 'Pit Mine',
    shortcut1: 0,
    shortcut2: 7,
    icon: pitMine,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.MALIANS],
  },
  {
    name: 'Military School',
    shortcut1: 0,
    shortcut2: 7,
    icon: militarySchool,
    type: BuildingType.MILITARY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.OTTOMANS],
  },
  {
    name: 'Cistern',
    shortcut1: 0,
    shortcut2: 7,
    icon: cistern,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Outpost',
    shortcut1: 0,
    shortcut2: 8,
    icon: outpost,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.MONGOL, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Fortress',
    shortcut1: 0,
    shortcut2: 8,
    icon: woodenFortress,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.RUS],
  },
  {
    name: 'Toll Outpost',
    shortcut1: 0,
    shortcut2: 8,
    icon: tollOutpost,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.MALIANS],
  },
  {
    name: 'Palisade Wall',
    shortcut1: 0,
    shortcut2: 9,
    icon: palisade,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Palisade Gate',
    shortcut1: 0,
    shortcut2: 10,
    icon: palisadeGate,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Aqueduct',
    shortcut1: 0,
    shortcut2: 11,
    icon: aqueduct,
    type: BuildingType.ECONOMY,
    age: BuildingAge.I,
    groups: [BuildingCivGroup.BYZANTINES],
  },
  // Age II
  {
    name: 'Blacksmith',
    shortcut1: 1,
    shortcut2: 0,
    icon: blacksmith,
    type: BuildingType.RESEARCH,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.COMMON],
  },
  {
    name: 'Market',
    shortcut1: 1,
    shortcut2: 1,
    icon: market,
    type: BuildingType.ECONOMY,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.COMMON],
  },
  {
    name: 'Town Center',
    shortcut1: 1,
    shortcut2: 2,
    icon: tc,
    type: BuildingType.ECONOMY,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.COMMON],
  },
  {
    name: 'Archery Range',
    shortcut1: 1,
    shortcut2: 4,
    icon: ar,
    type: BuildingType.MILITARY,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.COMMON],
  },
  {
    name: 'Stable',
    shortcut1: 1,
    shortcut2: 5,
    icon: stable,
    type: BuildingType.MILITARY,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Granary',
    shortcut1: 1,
    shortcut2: 6,
    icon: granary,
    type: BuildingType.ECONOMY,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.CHINESE],
  },
  {
    name: 'Cattle Ranch',
    shortcut1: 1,
    shortcut2: 6,
    icon: cattleRanch,
    type: BuildingType.ECONOMY,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.MALIANS],
  },
  {
    name: 'Mercenary House',
    shortcut1: 1,
    shortcut2: 6,
    icon: mercenaryHouse,
    type: BuildingType.MILITARY,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Stone Tower',
    shortcut1: 1,
    shortcut2: 8,
    icon: tower,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Stone Wall',
    shortcut1: 1,
    shortcut2: 9,
    icon: wall,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Stone Gate',
    shortcut1: 1,
    shortcut2: 10,
    icon: stoneGate,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.II,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE, BuildingCivGroup.BYZANTINES],
  },
  // Age III
  {
    name: 'Monastery',
    shortcut1: 2,
    shortcut2: 0,
    icon: monastery,
    type: BuildingType.RESEARCH,
    age: BuildingAge.III,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.MONGOL, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE],
  },
  {
    name: 'Prayer Tent',
    shortcut1: 2,
    shortcut2: 0,
    icon: mosque,
    type: BuildingType.ECONOMY,
    age: BuildingAge.III,
    groups: [BuildingCivGroup.ABBASID],
  },
  {
    name: 'Mosque',
    shortcut1: 2,
    shortcut2: 0,
    icon: mosque,
    type: BuildingType.ECONOMY,
    age: BuildingAge.III,
    groups: [BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS],
  },
  {
    name: 'Shinto Shrine / Buddhist Temple',
    shortcut1: 2,
    shortcut2: 0,
    icon: shintoShrine,
    type: BuildingType.ECONOMY,
    age: BuildingAge.III,
    groups: [BuildingCivGroup.JAPANESE],
  },
  {
    name: 'Monastery',
    shortcut1: 2,
    shortcut2: 0,
    icon: monastery,
    type: BuildingType.ECONOMY,
    age: BuildingAge.III,
    groups: [BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Siege Workshop',
    shortcut1: 2,
    shortcut2: 4,
    icon: siege,
    type: BuildingType.MILITARY,
    age: BuildingAge.III,
    groups: [BuildingCivGroup.COMMON],
  },
  {
    name: 'Pagoda',
    shortcut1: 2,
    shortcut2: 5,
    icon: pagoda,
    type: BuildingType.ECONOMY,
    age: BuildingAge.III,
    groups: [BuildingCivGroup.CHINESE],
  },
  {
    name: 'Keep',
    shortcut1: 2,
    shortcut2: 8,
    icon: keep,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.III,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.BYZANTINES],
  },
  // Age IV
  {
    name: 'University',
    shortcut1: 3,
    shortcut2: 0,
    icon: university,
    type: BuildingType.RESEARCH,
    age: BuildingAge.IV,
    groups: [BuildingCivGroup.GENERIC, BuildingCivGroup.RUS, BuildingCivGroup.CHINESE, BuildingCivGroup.ABBASID, BuildingCivGroup.DELHI, BuildingCivGroup.MALIANS, BuildingCivGroup.OTTOMANS, BuildingCivGroup.JAPANESE, BuildingCivGroup.BYZANTINES],
  },
  {
    name: 'Castle',
    shortcut1: 3,
    shortcut2: 4,
    icon: keep,
    type: BuildingType.FORTIFIED,
    age: BuildingAge.IV,
    groups: [BuildingCivGroup.JAPANESE],
  },
] satisfies Building[]

export default Buildings
