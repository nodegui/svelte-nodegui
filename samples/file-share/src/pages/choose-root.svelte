<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    WidgetEventTypes,
    QDragMoveEvent,
    QDropEvent,
  } from "@nodegui/nodegui";
  import AppHeader from "../components/app-header.svelte";
  import { getNetworkAddresses } from "../utils";
  import * as http from "http";
  import * as fs from "fs";
  import { root } from "../stores/root";
  import type { AddressInfo } from "net";
  import ServerStatus from "../components/server-status.svelte";
  let ddButton;
  let httpServer: http.Server;
  let port = 9000;

  onMount(() => {
    ddButton.nativeView.setAcceptDrops(true);

    ddButton.nativeView.addEventListener(WidgetEventTypes.DragEnter, (e) => {
      let ev = new QDragMoveEvent(e);
      ev.accept();
    });

    ddButton.nativeView.addEventListener(WidgetEventTypes.Drop, (e) => {
      let dropEvent = new QDropEvent(e);
      let mimeData = dropEvent.mimeData();
      let urls = mimeData.urls();
      const rootFile = urls[0].toLocalFile();

      try {
        console.log("Starting server for", rootFile);
        // Check if server was already running
        if (httpServer) {
          httpServer.close();
        }

        httpServer = http.createServer(function (request, response) {
          request
            .addListener("end", function () {
              var data = fs.readFileSync($root.fileLocation);
              response.end(data);
            })
            .resume();
        });
        const host = getHostName();
        $root = {
           fileLocation: rootFile,
           serverAddress: `http://${host}:${port}/`
        };
        httpServer.listen(9000, host);
        
      } catch (error) {
        console.error('Unable to start HTTP Server')
        console.error(error);
      }
    });
  });

  let getHostName = (): string => {
    if (!httpServer) return null;
    const networkAddresses = getNetworkAddresses();
    const host = networkAddresses.filter(p => p != '127.0.0.1')[0]
    return host
  };
</script>

<view id="container">
  <AppHeader />

  <view id="root_folder_area" bind:this={ddButton}>
    <text id="drop_zone_text">Drop a file here to start sharing</text>
  </view>

  <ServerStatus
    fileLocation={$root.fileLocation}
    serverAddress={$root.serverAddress}
  />
</view>

<style>
  #container {
    padding: 8;
    justify-content: "center";
    height: "100%";
  }

  #drop_zone_text {
    font-size: 16px;
    color: "#AAAAAA";
  }

  #root_folder_area {
    margin-top: 8;
    margin-bottom: 8;
    padding-top: 72;
    padding-bottom: 72;
    background-color: "#1B7E96";
    justify-content: "center";
    align-items: "center";
    border-radius: 8;
  }
</style>
