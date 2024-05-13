<script lang="ts">
    import { AppShell, Header, Navbar } from "@svelteuidev/core";
    import Menubar from "./components/menubar/Menubar.svelte";

</script>
<style>
</style>
<AppShell>
	<Navbar slot="navbar">
		<Menubar></Menubar>
	</Navbar>
	<Header height="100%" slot="header">
		
	</Header>

	<slot>This is the main content</slot>
</AppShell>