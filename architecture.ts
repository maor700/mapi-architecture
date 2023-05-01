interface MainStore {
  user: User;
  device: { deviceType: "desktop" | "mobile"; score: number };
  search: {
    serachText: string;
    searchResult: SearchResult[];
  };
  catalog: {
    vectors: Layer<Vector>[];
    rasters: Layer<Raster>[];
    baseLayers: Layer<Raster>[];
  };
  data: {
    [layerName: string]: Item[];
  };
  map: {
    type: "2D" | "3D";
    moveable: boolean;
    zoom: number;
    center: [number, number];
    selectedItem: string | null;
    itemDetails: Item | null;
  };
  filters: Filter[];
  selectedLayer: string | null;
  selectedItems: string[] | null;
}

interface LayerProvider {
  name: string;
  url: string;
}

interface Layer<T> {
  id: string;
  name: string;
  score: number;
  isActive: boolean;
  visibility: VisibilityMode;
  categories: string[];
  govOffices: string[];
  schema: LayerSchema<T>;
  provider: LayerProvider;
  description: string;
  type: LayerType;
  additionalData: T;
  updateTime: string;
  projection: string;
}

interface LayerSchema {
  [key: string]: string;
}

interface Raster {
  type: "tiff" | "png" | "jpg";
  resolution: number;
  extent: number[];
}

interface Item<T = unknown> {
  id: string;
  time: string;
  geo: Geometry;
  additionalData: T;
  visibility: VisibilityMode;
}

interface User {
  name: string;
  email: string;
  id: string;
  token: string;
}

interface Vector {
  type: "geojson" | "shapefile";
  extent: number[];
}

enum VisibilityMode {
  on = "on",
  off = "off",
  solo = "solo",
}

type LayerType = "raster" | "vector";

interface MapActions {
  setAreaMap: (area: BBox) => ReduxAction;
  featureClick: (feature: Feature) => ReduxAction;
  featureHover: (feature: Feature) => ReduxAction;
  featureUnhover: () => ReduxAction;
  flyTo: (feature: Feature) => ReduxAction;
  showPopup: (feature: Feature) => ReduxAction;
  drawOnMap: (feature: Feature) => ReduxAction;
  mesureOnMap: (feature: Feature) => ReduxAction;
}

// packages
apps: mapi - app;
components: mapi - header;
mapi - footer;
mapi - map;
mapi - search;
mapi - layers;
mapi - filters;
mapi - item - details;
mapi - item - list;
mapi - item;
mapi - item - popup;
libs: mapi - common > MainStore;
types;
helpers;

mapiOLMap;
mapiCesiumMap;

interface IProviderService<L, D> {
  name: string;
  url: string;
  getLayers(user:User): Promise<Layer<L>[]>;
  getLayerData(params: string[]): Promise<Item<D>[]>;
  getItemDetails(itemId: string, layerId: string): Promise<Item<D>>;

  //admin methods
  addLayer(layer: Layer<L>): Promise<Layer<L>>;
  updateLayer(layer: Layer<L>): Promise<Layer<L>>;
  deleteLayer(layerId: string): Promise<void>;
  addLayerData(layerId: string, data: Item<D>[]): Promise<Item<D>[]>;
  updateLayerData(layerId: string, data: Item<D>[]): Promise<Item<D>[]>;
  deleteLayerData(layerId: string, dataIds: string[]): Promise<void>;
}
