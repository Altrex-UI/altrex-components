<template>
    <Icon :icon="icon" :class="`altrex-icon altrex-icon--${size}`" :title="title" v-bind="$attrs" />
</template>

<script>
    
import altrexIconLibrary from '@altrex-ui/icons/iconify/altrex.json';
import { Icon, addCollection } from '@iconify/vue';
addCollection(altrexIconLibrary);

export default {
    name: 'AltrexIcon',
    components: {
        Icon,
    },
    props: {
        name: {
            required: true,
            type: String,
        },
        size: {
            default: 'm',
            required: false,
            type: String,
        },
        title: {
            type: String,
        },
    },
    computed: {
        icon() {
            let [setName, iconName] = this.name.split(':');

            if (!iconName) {
                iconName = setName;
                setName = 'altrex';
            }
            const icon = `${setName}:${iconName}`;

            return icon;
        },
    },
};
</script>
