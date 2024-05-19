<script lang="ts">
    import { AppShell, Header, Navbar, SvelteUIProvider } from "@svelteuidev/core";
    import Menubar from "./components/titlebar/TitleBar.svelte";
    import MainLayout from "./layouts/MainLayout.svelte";
    import TitleBar from "./components/titlebar/TitleBar.svelte";

	const mainStyles = {
		with: '10%'
	}
</script>
<style>
</style>
<SvelteUIProvider withGlobalStyles withNormalizeCSS override={mainStyles}>
	<MainLayout>
		<TitleBar slot="top-bar" />
	</MainLayout>
	<slot>This is the main content</slot>
</SvelteUIProvider>
