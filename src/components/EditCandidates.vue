<script lang="ts" setup>
import { VDialog, VTabs, VTab, VCard, VCardText, VWindow, VWindowItem } from 'vuetify/components';
import useStore from '../store';
import { ref } from 'vue';

const store = useStore();
const tab = ref("update");
</script>

<template>
  <v-dialog v-model="store.showEditCandidates">
    <v-card>
      <v-tabs v-model="tab">
        <v-tab value="update">编辑候选人员</v-tab>
        <v-tab value="create">添加候选人员</v-tab>
        <v-tab value="delete">删除候选人员</v-tab>
      </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="update"><!--TODO 改 删 交换--></v-window-item>
        <v-window-item value="create"><!--TODO 批量增--></v-window-item>
        <v-window-item value="delete"><!--TODO 批量删 (名次)--></v-window-item>
      </v-window>
    </v-card-text>
    </v-card>
  </v-dialog>
</template>
