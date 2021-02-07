<script lang="ts">
  import { onMount } from "svelte";
  import {
    WidgetEventTypes,
    QDragMoveEvent,
    QDropEvent,
  } from "@nodegui/nodegui";
  import AppHeader from "../components/app-header.svelte";
  import { getNetworkAddresses } from "../utils";
  import * as http from "http";
  import * as fs from "fs";
  import { rootFolder } from "../stores/root-folder";
  import type { AddressInfo } from "net";
  import ServerStatus from "../components/server-status.svelte";
  let ddButton;
  let nodeStaticServer;
  let httpServer: http.Server;

  onMount(() => {
    ddButton.nativeView.setAcceptDrops(true);

    ddButton.nativeView.addEventListener(WidgetEventTypes.DragEnter, (e) => {
      let ev = new QDragMoveEvent(e);
      console.log("dragEnter", ev.proposedAction());
      let mimeData = ev.mimeData();
      mimeData.text(); //Inspection of text works
      console.log("mimeData", {
        hasColor: mimeData.hasColor(),
        hasHtml: mimeData.hasHtml(),
        hasImage: mimeData.hasImage(),
        hasText: mimeData.hasText(),
        hasUrls: mimeData.hasUrls(),
        html: mimeData.html(),
        text: mimeData.text(),
      }); //Inspection of MIME data works
      let urls = mimeData.urls(); //Get QUrls
      for (let url of urls) {
        let str = url.toString();
        console.log("url", str); //Log out Urls in the event
      }
      ev.accept(); //Accept the drop event, which is crucial for accepting further events
    });
    ddButton.nativeView.addEventListener(WidgetEventTypes.Drop, (e) => {
      let dropEvent = new QDropEvent(e);
      let mimeData = dropEvent.mimeData();
      console.log("dropped", dropEvent.type());
      let urls = mimeData.urls();
      for (let url of urls) {
        let str = url.toString();
        console.log("url", str); //Example of inspection of dropped data.
      }

      console.log("starting server for", urls[0].toLocalFile());
      try {
        // ws = new nodeStaticServer.Server(   urls[0].toLocalFile());

        httpServer = http.createServer(function (request, response) {
          request
            .addListener("end", function () {
              //
              // Serve files!
              //
              // ws.serve(request, response);
              var data = fs.readFileSync(urls[0].toLocalFile());
              response.end(data);
            })
            .resume();
        });
        httpServer.listen(9000);
        rootFolder.set(urls[0].toLocalFile());
        console.log("server", httpServer.address().toString());
      } catch (error) {
        console.error(error);
      }
    });
  });

  $: httpServerAddresses = getHttpServerAddress(httpServer);

  let getHttpServerAddress = (httpServer: http.Server): string[] => {
    if (!httpServer) return null;
    const networkAddresses = getNetworkAddresses();

    var serverAddressObj = httpServer.address() as AddressInfo;
    const serverAddressStrings = networkAddresses.map(
      (addr) => `http://${addr}:${serverAddressObj.port}`
    );
    console.log("addrstr", JSON.stringify(serverAddressStrings));
    return serverAddressStrings;
  };
</script>

<view id="container">
  <AppHeader />

  <view id="root_folder_area" bind:this={ddButton}>
    <text>Drop a file here to start sharing</text>
  </view>

  <ServerStatus rootFolder={$rootFolder} serverAddress={httpServerAddresses} />
</view>

<style>
  #container {
    padding: 8;
    justify-content: "center";
    height: "100%";
  }

  #root_folder_area {
    margin-top: 16;
    padding-top: 64;
    padding-bottom: 64;
    background-color: "#1B7E96";
    justify-content: 'center';
    align-items: 'center';
    border-radius: 8;
  }
</style>
