import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import { responseBySearch, responseByNumber } from "./constants";

jest.mock("@/helpers/getSites", () => {
  const {
    responseByNumber,
    responseByCategory,
    responseBySearch,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require("./constants");
  return {
    getSitesByPageNumber: () => responseByNumber,
    getSitesByCategory: () => responseByCategory,
    getSitesByQuery: () => responseBySearch,
  };
});

describe("Home.vue", () => {
  it("Renders title based on HeaderComponent prop passed", () => {
    const title = "Scheduling";

    const wrapper = mount(Home, {
      global: {
        stubs: ["FontAwesomeIcon", "RouterLink"],
      },
    });

    expect(wrapper.text()).toMatch(title);
  });

  it("Filter sites using category selector", async () => {
    const wrapper = mount(Home, {
      global: {
        stubs: ["FontAwesomeIcon", "RouterLink"],
      },
    });

    const options = wrapper.find("select").findAll("option");

    await options.at(1).setSelected();

    expect(wrapper.find("option:checked").element.value).toBe("Health House");

    await options.at(0).setSelected();

    expect(wrapper.find("option:checked").element.value).toBe("All Sites");
  });

  it("Filter sites using search input", async () => {
    const wrapper = mount(Home, {
      global: {
        stubs: ["FontAwesomeIcon", "RouterLink"],
      },
    });

    await wrapper.find("[data-search]").setValue("Lenora");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.searchQuery).toBe("Lenora");
    expect(wrapper.vm.sitesList).toStrictEqual(responseBySearch);

    await wrapper.find("[data-search]").setValue("");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.searchQuery).toBe("");
    expect(wrapper.vm.sitesList).toStrictEqual(responseByNumber);
  });

  it("Recieve data when LoadMoreSites is called", async () => {
    const wrapper = mount(Home, {
      global: {
        stubs: ["FontAwesomeIcon", "RouterLink"],
      },
    });

    expect(wrapper.vm.sitesList).toStrictEqual([{}]);

    await wrapper.vm.handleScroll();

    expect(wrapper.vm.sitesList).toStrictEqual(responseByNumber);
  });
});
