import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HighlightText from "@/components/HighlightText";

describe("Highlight.vue", () => {
  it("Highlight Basic test ***", () => {
    const text = "Hello";
    const wrapper = shallowMount(HighlightText, {
      propsData: { text }
    });
    expect(wrapper.text()).to.equal("Hello");
  });

  it("Highlight Matched word found ***", () => {
    const text = "Hello";
    const highLight = "llo";
    const wrapper = shallowMount(HighlightText, {
      propsData: { text, highLight }
    });
    expect(wrapper.vm.matchedText).to.equal("llo");
  });
  it("Highlight firstText word found ***", () => {
    const text = "Hello";
    const highLight = "llo";
    const wrapper = shallowMount(HighlightText, {
      propsData: { text, highLight }
    });
    expect(wrapper.vm.firstText).to.equal("He");
  });
  it("Highlight lastText word found ***", () => {
    const text = "Hello";
    const highLight = "el";
    const wrapper = shallowMount(HighlightText, {
      propsData: { text, highLight }
    });
    expect(wrapper.vm.lastText).to.equal("lo");
  });
});
