(function(exports,common,components,metro,patcher,assets,plugin,storage,_vendetta,ui){'use strict';const { openLazy, hideActionSheet } = metro.findByProps("openLazy", "hideActionSheet");
function makeDefaults(object, defaults) {
  if (object != void 0) {
    if (defaults != void 0) {
      for (const key of Object.keys(defaults)) {
        if (typeof defaults[key] === "object" && !Array.isArray(defaults[key])) {
          if (typeof object[key] !== "object")
            object[key] = {};
          makeDefaults(object[key], defaults[key]);
        } else {
          object[key] ?? (object[key] = defaults[key]);
        }
      }
    }
  }
}
function createList(version) {
  let a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    version,
    new: a,
    updated: u,
    fix: f
  };
}function ma() {
  for (var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++) {
    a[_key] = arguments[_key];
  }
  return [
    ...a
  ];
}
const update = [
  createList("1.0.0", ma("Created the Plugin")),
  createList("1.0.1", ma("Added FuzzySearch")),
  createList("1.0.2", ma("Added Option to remove telemetry")),
  createList("1.0.3", ma("Added Option to toggle encoding for parsed URL", "Url Parser will automatically encode URL before sending to RIS APIs"))
];
var updates = update.reverse();const { ScrollView: ScrollView$3, View: View$3, Text: Text$3, TouchableOpacity: TouchableOpacity$3, TextInput: TextInput$3, Image: Image$3, Animated: Animated$3 } = components.General;
const { FormLabel: FormLabel$3, FormIcon: FormIcon$3, FormArrow: FormArrow$3, FormRow: FormRow$4, FormSwitch: FormSwitch$3, FormSwitchRow: FormSwitchRow$3, FormSection: FormSection$3, FormDivider: FormDivider$3, FormInput: FormInput$3 } = components.Forms;
const current = assets.getAssetIDByName("ic_radio_square_checked_24px");
const older = assets.getAssetIDByName("ic_radio_square_24px");
const info = assets.getAssetIDByName("ic_information_24px");
assets.getAssetIDByName("ic_info");
const newStuff = assets.getAssetIDByName("premium_sparkles");
const updatedStuff = assets.getAssetIDByName("ic_sync_24px");
const fixStuff = assets.getAssetIDByName("ic_progress_wrench_24px");
const styles$2 = common.stylesheet.createThemedStyleSheet({
  border: {
    borderRadius: 10
  },
  textBody: {
    color: ui.semanticColors.TEXT_NORMAL,
    fontFamily: common.constants.Fonts.PRIMARY_MEDIUM,
    letterSpacing: 0.25,
    fontSize: 22
  },
  textBody: {
    color: ui.semanticColors.INPUT_PLACEHOLDER_TEXT,
    fontFamily: common.constants.Fonts.DISPLAY_NORMAL,
    letterSpacing: 0.25,
    fontSize: 16
  },
  versionBG: {
    margin: 10,
    padding: 15,
    backgroundColor: "rgba(55, 149, 225, 0.3)"
  },
  rowLabel: {
    margin: 10,
    padding: 15,
    backgroundColor: "rgba(33, 219, 222, 0.34)"
  }
});
function addIcon(icon) {
  return /* @__PURE__ */ common.React.createElement(FormIcon$3, {
    style: {
      opacity: 1
    },
    source: icon
  });
}
function VersionChange(param) {
  let { change, index, totalIndex } = param;
  const [isOpen, setOpen] = common.React.useState(false);
  const [isRowOpen, setRowOpen] = common.React.useState(false);
  function createSubRow(arr, label, subLabel, icon) {
    return /* @__PURE__ */ common.React.createElement(View$3, null, /* @__PURE__ */ common.React.createElement(FormRow$4, {
      label: label || "No Section",
      subLabel: subLabel || null,
      leading: icon && addIcon(icon),
      style: [
        styles$2.textHeader
      ]
    }), arr.map(function(x, i) {
      return /* @__PURE__ */ common.React.createElement(common.React.Fragment, null, /* @__PURE__ */ common.React.createElement(FormRow$4, {
        label: x,
        style: [
          styles$2.textBody,
          styles$2.rowLabel,
          styles$2.border
        ]
      }));
    }));
  }
  return /* @__PURE__ */ common.React.createElement(common.React.Fragment, null, /* @__PURE__ */ common.React.createElement(components.ErrorBoundary, null, /* @__PURE__ */ common.React.createElement(FormRow$4, {
    label: change?.version,
    leading: index == 0 ? addIcon(current) : addIcon(older),
    trailing: addIcon(info),
    onPress: function() {
      setOpen(!isOpen);
    }
  }), isOpen && /* @__PURE__ */ common.React.createElement(View$3, {
    style: [
      styles$2.versionBG,
      styles$2.border
    ]
  }, change?.new?.length > 0 && createSubRow(change.new, "New", "New stuffies", newStuff), change?.updated?.length > 0 && createSubRow(change.updated, "Changes", "Update things", updatedStuff), change?.fix?.length > 0 && createSubRow(change.fix, "Fixes", "Me hate borken things", fixStuff)), index == totalIndex.length - 1 ? void 0 : /* @__PURE__ */ common.React.createElement(FormDivider$3, null)));
}const { ScrollView: ScrollView$2, View: View$2, Text: Text$2, TouchableOpacity: TouchableOpacity$2, TextInput: TextInput$2, Image: Image$2, Animated: Animated$2 } = components.General;
const { FormLabel: FormLabel$2, FormIcon: FormIcon$2, FormArrow: FormArrow$2, FormRow: FormRow$3, FormSwitch: FormSwitch$2, FormSwitchRow: FormSwitchRow$2, FormSection: FormSection$2, FormDivider: FormDivider$2, FormInput: FormInput$2, FormRadioRow } = components.Forms;
function createToggle(id, label) {
  let subLabel = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, icon = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, def = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  return {
    id,
    label,
    subLabel,
    icon,
    def
  };
}
const toggles = [
  createToggle("removeTracking", "Remove Telementry", "Remove additional telemetry from url or site tracking"),
  createToggle("encodeURL", "Encode Parsed URL", "encodeURL Before sending to RIS APIs")
];
function SettingPage() {
  storage.useProxy(plugin.storage);
  return /* @__PURE__ */ React.createElement(ScrollView$2, {
    style: {
      flex: 1
    },
    contentContainerStyle: {
      paddingBottom: 38
    }
  }, /* @__PURE__ */ React.createElement(FormSection$2, null, toggles.map(function(elem, indx) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormRow$3, {
      label: elem?.label,
      subLabel: elem?.subLabel,
      leading: elem?.icon && /* @__PURE__ */ React.createElement(FormIcon$2, {
        style: {
          opacity: 1
        },
        source: assets.getAssetIDByName(elem?.icon)
      }),
      trailing: /* @__PURE__ */ React.createElement(FormSwitch$2, {
        value: plugin.storage?.toggle[elem?.id] || false,
        onValueChange: function(value) {
          return plugin.storage.toggle[elem.id] = value;
        }
      })
    }), indx == toggles?.length - 1 ? void 0 : /* @__PURE__ */ React.createElement(FormDivider$2, null));
  })), /* @__PURE__ */ React.createElement(FormSection$2, {
    title: "Services"
  }, /* @__PURE__ */ React.createElement(common.ReactNative.FlatList, {
    data: Object.entries(plugin.storage.services),
    ItemSeparatorComponent: FormDivider$2,
    renderItem: function(param) {
      let { item: [id, item] } = param;
      return /* @__PURE__ */ React.createElement(FormRadioRow, {
        label: item.name,
        selected: item.enabled,
        onPress: function() {
          return item.enabled = !item.enabled;
        }
      });
    }
  })), updates && /* @__PURE__ */ React.createElement(FormSection$2, {
    title: "Updates"
  }, /* @__PURE__ */ React.createElement(View$2, {
    style: {
      margin: 5,
      padding: 5,
      borderRadius: 10,
      backgroundColor: "rgba(0, 0, 0, 0.3)"
    }
  }, updates.map(function(data, index) {
    return /* @__PURE__ */ React.createElement(VersionChange, {
      change: data,
      index,
      totalIndex: updates.length
    });
  }))));
}async function getData(url) {
  if (url) {
    const finalLink = `https://api-next.fuzzysearch.net/v1/url?url=${url}`;
    const response = await fetch(finalLink, {
      method: "GET",
      headers: {
        "x-api-key": "eluIOaOhIP1RXlgYetkcZCF8la7p3NoCPy8U0i8dKiT4xdIH",
        "Accept": "application/json"
      }
    });
    let data = await response.json();
    if (data == "unavailable") {
      data = null;
    }
    return data;
  }
}const { ScrollView: ScrollView$1, View: View$1, Text: Text$1, TouchableOpacity: TouchableOpacity$1, TextInput: TextInput$1, Image: Image$1, Animated: Animated$1 } = components.General;
const { FormLabel: FormLabel$1, FormIcon: FormIcon$1, FormArrow: FormArrow$1, FormRow: FormRow$2, FormSwitch: FormSwitch$1, FormSwitchRow: FormSwitchRow$1, FormSection: FormSection$1, FormDivider: FormDivider$1, FormInput: FormInput$1 } = components.Forms;
const { openURL: openURL$1 } = metro.findByProps("openURL", "openDeeplink");
const styles$1 = common.stylesheet.createThemedStyleSheet({
  bg: {
    borderRadius: 10,
    padding: 10,
    margin: 6,
    backgroundColor: "rgba(87, 187, 131, 0.25)"
  }
});
function FuzzySearchRow(param) {
  let { data } = param;
  const sites = {
    "furaffinity": "https://www.furaffinity.net/view/",
    "e621": "https://e621.net/posts/",
    "weasyl": "https://www.weasyl.com/view/"
  };
  return /* @__PURE__ */ common.React.createElement(common.React.Fragment, null, /* @__PURE__ */ common.React.createElement(FormRow$2, {
    label: data?.site,
    subLabel: `Uploaded/Created by ${data?.artists?.[0]}`,
    trailing: /* @__PURE__ */ common.React.createElement(FormArrow$1, null),
    style: [
      styles$1.bg
    ],
    onPress: function() {
      if (data?.site?.toLowerCase?.() == "twitter") {
        openURL$1(`https://twitter.com/${data.artists?.[0]}/status/${data?.site_id_str}`);
      } else {
        openURL$1(`${sites[data?.site?.toLowerCase?.()]}${data?.site_id || data?.site_id_str}`);
      }
    }
  }));
}const { ScrollView, View, Text, TouchableOpacity, TextInput, Image, Animated } = components.General;
const { FormLabel, FormIcon, FormArrow, FormRow: FormRow$1, FormSwitch, FormSwitchRow, FormSection, FormDivider, FormInput } = components.Forms;
const styles = common.stylesheet.createThemedStyleSheet({
  baseBg: {
    margin: 20,
    padding: 25,
    backgroundColor: "rgba(55, 149, 225, 0.3)"
  },
  bg: {
    borderRadius: 10,
    backgroundColor: "rgba(117, 227, 151, 0.35)"
  },
  border: {
    borderRadius: 10
  }
});
function FuzzySearchPage(param) {
  let { url } = param;
  storage.useProxy(plugin.storage);
  const [data, setData] = common.React.useState([]);
  if (Array.isArray(data) && data?.length < 1) {
    let finalUrl = url;
    if (plugin.storage?.toggle?.removeTracking) {
      const parsedCode = new URL(url);
      finalUrl = `${parsedCode.origin}${parsedCode.pathname}`;
    }
    if (plugin.storage?.toggle?.encodeURL) {
      finalUrl = encodeURIComponent(finalUrl);
    }
    getData(finalUrl).then(function(datax) {
      return setData(datax);
    });
  }
  return /* @__PURE__ */ common.React.createElement(common.React.Fragment, null, /* @__PURE__ */ common.React.createElement(ScrollView, null, /* @__PURE__ */ common.React.createElement(View, {
    style: [
      styles.baseBg,
      styles.border
    ]
  }, Array.isArray(data) && data.length < 1 && /* @__PURE__ */ common.React.createElement(common.React.Fragment, null, /* @__PURE__ */ common.React.createElement(FormRow$1, {
    label: "Loading..."
  })), Array.isArray(data) ? data?.map(function(res, inx) {
    return /* @__PURE__ */ common.React.createElement(common.React.Fragment, null, /* @__PURE__ */ common.React.createElement(FuzzySearchRow, {
      data: res
    }), inx == data.length - 1 ? void 0 : /* @__PURE__ */ common.React.createElement(FormDivider, null));
  }) : /* @__PURE__ */ common.React.createElement(common.React.Fragment, null, /* @__PURE__ */ common.React.createElement(FormRow$1, {
    label: "Sorry, Couldn't find any results!"
  })))));
}const { openURL } = metro.findByProps("openURL", "openDeeplink");
const { FormRow } = components.Forms;
const Icon = metro.findByName("Icon") ?? metro.findByProps("Sizes", "compare");
const ActionSheet = metro.findByProps("openLazy", "hideActionSheet");
const SearchIcon = /* @__PURE__ */ common.React.createElement(Icon, {
  source: assets.getAssetIDByName("search")
});
const Navigation = metro.findByProps("push", "pushLazy", "pop");
const modalCloseButton = metro.findByProps("getRenderCloseButton")?.getRenderCloseButton ?? metro.findByProps("getHeaderCloseButton")?.getHeaderCloseButton;
const Navigator = metro.findByName("Navigator") ?? metro.findByProps("Navigator")?.Navigator;
const listOfServices = {
  saucenao: {
    name: "SauceNAO",
    url: `https://saucenao.com/search.php?url=%s`,
    enabled: true
  },
  tracemoe: {
    name: "trace.moe (Anime)",
    url: `https://trace.moe/?url=%s`,
    enabled: true
  },
  iqdb: {
    name: "IQDB",
    url: `https://iqdb.org/?url=%s`,
    enabled: false
  },
  imgops: {
    name: "ImgOps",
    url: `https://imgops.com/%s`,
    enabled: false
  },
  tineye: {
    name: "TinEye",
    url: `https://tineye.com/search?url=%s`,
    enabled: false
  },
  google: {
    name: "Google Images",
    url: `https://www.google.com/searchbyimage?image_url=%s&safe=off&sbisrc=cr_1_5_2`,
    enabled: false
  },
  yandex: {
    name: "Yandex Images",
    url: `https://yandex.com/images/search?rpt=imageview&url=%s`,
    enabled: false
  },
  fuzzysearch: {
    name: "FuzzySearch (FurAffinity, Twitter)",
    enabled: false,
    titlePage: "Fuzzysearch.net"
  }
};
makeDefaults(plugin.storage, {
  services: listOfServices,
  toggle: {
    removeTracking: false,
    encodeURL: false
  }
});
const patches = [];
var index = {
  onLoad: function() {
    patches.push(patcher.before("openLazy", ActionSheet, function(param) {
      let [component, key] = param;
      if (key !== "MediaShareActionSheet")
        return;
      component.then(function(instance) {
        const unpatch = patcher.after("default", instance, function(param2, res) {
          let [{ syncer }] = param2;
          common.React.useEffect(function() {
            return unpatch();
          }, []);
          let urlsource = syncer.sources[syncer.index.value];
          if (Array.isArray(urlsource))
            urlsource = urlsource[0];
          const targetURL = urlsource.sourceURI ?? urlsource.uri;
          const buttonRows = res.props.children.props.children;
          if (buttonRows) {
            const filtered = Object.keys(listOfServices).filter(function(id) {
              return plugin.storage.services[id].enabled;
            });
            buttonRows.push(filtered.map(function(id) {
              const onPress = function() {
                if (listOfServices[id].url) {
                  let finalUrl = targetURL;
                  if (plugin.storage?.toggle?.removeTracking) {
                    const parsedCode = new URL(targetURL);
                    finalUrl = `${parsedCode.origin}${parsedCode.pathname}`;
                  }
                  if (plugin.storage?.toggle?.encodeURL) {
                    finalUrl = encodeURIComponent(finalUrl);
                  }
                  openURL(listOfServices[id].url.replace("%s", finalUrl));
                } else {
                  const navigator = function() {
                    return /* @__PURE__ */ common.React.createElement(Navigator, {
                      initialRouteName: "ServicePage",
                      goBackOnBackPress: true,
                      screens: {
                        ServicePage: {
                          title: listOfServices[id].titlePage,
                          headerLeft: modalCloseButton?.(function() {
                            return Navigation.pop();
                          }),
                          render: function() {
                            return /* @__PURE__ */ common.React.createElement(FuzzySearchPage, {
                              url: targetURL
                            });
                          }
                        }
                      }
                    });
                  };
                  ActionSheet.hideActionSheet();
                  Navigation.push(navigator);
                }
              };
              return /* @__PURE__ */ common.React.createElement(common.React.Fragment, null, /* @__PURE__ */ common.React.createElement(FormRow, {
                leading: SearchIcon,
                label: listOfServices[id].name,
                onPress
              }));
            }));
          }
        });
      });
    }));
  },
  onUnload: function() {
    patches.forEach(function(un) {
      return un();
    });
  },
  settings: SettingPage
};exports.default=index;Object.defineProperty(exports,'__esModule',{value:true});return exports;})({},vendetta.metro.common,vendetta.ui.components,vendetta.metro,vendetta.patcher,vendetta.ui.assets,vendetta.plugin,vendetta.storage,vendetta,vendetta.ui);