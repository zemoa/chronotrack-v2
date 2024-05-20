<script lang="ts">


</script>
<style>
	.main{
		display: flex;
		flex-direction: column;
	}
	.main > nav {
		height: 33px;
		-webkit-app-region: drag;    /* Allow user to drag the window using this titlebar */
		-webkit-user-select: none;   /* Prevent user from selecting things */
		user-select: none;
	}
</style>
<div class="main">
	<nav>
		<slot name="top-bar" />
	</nav>
	<div>
		<slot />
	</div>
</div>
