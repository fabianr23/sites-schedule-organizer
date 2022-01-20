import { mount } from "@vue/test-utils";
import SiteDetail from "@/views/SiteDetail.vue";
import { responseByFilter } from "./constants";

jest.mock("@/helpers/getSites", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { responseByFilter } = require("./constants");
  return {
    getSitesByFilter: () => responseByFilter,
  };
});

jest.mock("vue-router", () => ({
  useRoute: jest.fn(() => ({
    params: {
      id: "f_mxzowJRJm",
    },
  })),
}));

describe("SiteDetail.vue", () => {
  it("Renders title based on HeaderComponent prop passed", () => {
    const title = "Scheduling";

    const mockRouter = {
      go: jest.fn(),
    };

    const wrapper = mount(SiteDetail, {
      global: {
        stubs: ["FontAwesomeIcon", "IconWithDescription"],
        mocks: {
          $router: mockRouter,
        },
      },
    });

    expect(wrapper.text()).toMatch(title);
  });

  it("Should shows the info loaded by getSitesByFilter", async () => {
    const title = "Games House";
    const phone = "(551) 331-0737";
    const email = "Virginie35@yahoo.com";
    const jobTitle = "Dynamic Identity Coordinator";
    const wrapper = await mount(SiteDetail, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
    });

    expect(wrapper.vm.site).toStrictEqual(responseByFilter[0]);
    expect(wrapper.text()).toMatch(title);
    expect(wrapper.text()).toMatch(phone);
    expect(wrapper.text()).toMatch(email);
    expect(wrapper.text()).toMatch(jobTitle);
  });
});
