<script>
function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    let c = 1024,
        d = b || 2,
        e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}

function debounce(func, timeout) {
    let timeoutID;
    return function () {
        const functionCall = () => func.apply(this, arguments);
        clearTimeout(timeoutID);
        timeoutID = setTimeout(functionCall, timeout);
    };
}


export default {
    name: "App",
    data() {
        return {
            results: [],
            columns: [
                {
                    field: 'text',
                    label: "Title",
                },
                {
                    field: 'length',
                    label: "Size",
                    numeric: true
                },
                {
                    field: 's',
                    label: "Seed",
                    numeric: true
                },
                {
                    field: 'l',
                    label: "Leech",
                    numeric: true
                },
            ],
            search: "",
            isLoading: false,
        };
    },
    created() {
        this.search = location.search.replace('?q=', '');
        this.fetchData();
    },
    watch: {
        search: debounce(function () {
            this.fetchData();
        }, 100),
    },
    methods: {
        fetchData() {
            if (!this.search.length || this.search.trim().length < 3) {
                return this.results = [];
            }
            let x = "re";
            this.isLoading = true;
            fetch(
                "https://ploxiustemporar.herokuapp.com/https://to" +
                "r" +
                x +
                "nt-paradise.ml/api/search?q=" +
                this.search
            )
                .then((response) => response.json())
                .then((results) => {
                    if (!results) return this.results = []
                    this.results = results.map((result) => {
                        result.length = formatBytes(result.len);
                        return result;
                    });
                }).then(() => {
                    this.isLoading = false;
                });
        },
    },
    computed: {
        isEmpty() {
            return !this.results.length;
        },
    },
};
</script>
<template>
    <div class="container">
        <h1 class="title is-1 my-3">Search</h1>
        <b-field>
            <b-input v-model="search"></b-input>
        </b-field>
        <b-table
            :data="isEmpty ? [] : results"
            :loading="isLoading"
            default-sort="s"
            default-sort-direction="desc"
            :striped="true"
            :paginated="true"
            :narrowed="true"
        >
            <b-table-column
                v-for="column in columns"
                :field="column.field"
                :label="column.label"
                :key="column.field"
                :numeric="column.numeric"
                v-slot="props"
            >{{ props.row[column.field] }}</b-table-column>
            <b-table-column field="id" label="Magnet" v-slot="props" numeric>
                <span class="icon">
                    <a
                        style="color: hsl(171, 100%, 41%)"
                        v-bind:href="'magnet:?xt=urn:btih:' + props.row.id + '&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337'"
                    >
                        <i class="fas fa-magnet">🧲</i>
                    </a>
                </span>
            </b-table-column>
        </b-table>
    </div>
</template>

