<template>
    <!--  header-->
    <div class="wrapper">
        <div class="wrapper-content">
            <section>
                <div class="container">
                    <div id="nav">
                        <h1 class="title">{{ title }}</h1>
                        <nav>
                            <ul>
                                <li>
                                    <router-link to="/">Home</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'About'}"> About </router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'Contact'}">Contact</router-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <router-view />

                    <message v-if="message" :message="message"/>

                    <new-note-creator :note="note" @addNote="addNewNote"/>

                    <div class="note-header">
                        <search :value="search"
                                placeholder="Find a news"
                                @search="search = $event"/>

                        <div class="icons" v-if="!isMobile()">
                            <svg :class="{ active: grid }" @click="grid = true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                            <svg :class="{ active: !grid }" @click="grid = false" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3" y2="6"></line>
                                <line x1="3" y1="12" x2="3" y2="12"></line>
                                <line x1="3" y1="18" x2="3" y2="18"></line>
                            </svg>
                        </div>
                    </div>

                    <notes :notes="getFilteredNotes" :grid="grid" @remove="removeNote"/>
                </div>
            </section>
        </div>
    </div>
    <!--  footer-->
</template>

<script>
    import message from '@/components/Message.vue'
    import newNoteCreator from "@/components/NewNoteCreator";
    import notes from "@/components/Notes";
    import search from "@/components/Search";

    export default {
        components: {
            message,
            newNoteCreator,
            notes,
            search,
        },

        data() {
            return {
                uniqueId: 2,
                title: 'News Feed App',
                message: null,
                grid: true,
                search: '',
                note: {
                    id: null,
                    title: '',
                    description: '',
                    author: '',
                    priorityLevel: '',
                    titleEditModeEnabled: false,
                    descriptionEditModeEnabled: false
                },
                notes: [
                    {
                        id: 0,
                        title: 'John Johnson',
                        description: 'First, solve the problem. Then, write the code.',
                        date: new Date(Date.now()).toLocaleString(),
                        author: 'Saqib',                        
                        priorityLevel: -1,
                        titleEditModeEnabled: false,
                        descriptionEditModeEnabled: false,
                        authorEditModeEnabled: false

                    },
                    {
                        id: 1,
                        title: 'Francis Bacon',
                        description: 'Knowledge is power.',
                        date: new Date(Date.now()).toLocaleString(),
                        author: 'Rafiq',                        
                        priorityLevel: 1,
                        titleEditModeEnabled: false,
                        descriptionEditModeEnabled: false
                    },
                    {
                        id: 2,
                        title: 'Steve Maguire',
                        description: 'Fix the cause, not the symptom.',
                        date: new Date(Date.now()).toLocaleString(),
                        author: 'Pattrick',                        
                        priorityLevel: 0,
                        titleEditModeEnabled: false,
                        descriptionEditModeEnabled: false
                    }
                ]
            }
        },

        computed: {
            getFilteredNotes() {
                let notesToShow = this.notes,
                    notesToSearch = this.search;
                if (!notesToSearch) return sortByPriority(notesToShow);

                notesToSearch = notesToSearch.trim().toLowerCase();
                notesToShow = notesToShow.filter(function (item) {
                    if (item.title.toLowerCase().indexOf(notesToSearch) !== -1
                        || item.description.toLowerCase().indexOf(notesToSearch) !== -1
                        || item.author.toLowerCase().indexOf(notesToSearch) !== -1
                        ) {
                        return item;
                    }
                });

                return sortByPriority(notesToShow);

                function sortByPriority(notes) {
                    return notes.sort((firstElement, secondElement) => secondElement.priorityLevel - firstElement.priorityLevel);
                }
            },
        },

        methods: {
            addNewNote() {
                let {title, description, author, priorityLevel} = this.note;
                if (title === '') {
                    this.message = "Title can't be blank";
                    return false;
                }
                this.notes.push({
                    id: this.getUniqueId(),
                    title,
                    description,
                    author,
                    date: new Date(Date.now()).toLocaleString(),
                    priorityLevel
                });
                this.note.id = null;
                this.note.title = "";
                this.note.description = "";
                this.note.author = "";
                this.note.priorityLevel = "";
                this.note.titleEditModeEnabled = false;
                this.note.descriptionEditModeEnabled = false;
                this.message = null;
            },

            removeNote(noteId) {
                let allNotes = this.notes;
                for (let index = 0; index < allNotes.length; index++) {
                    if (allNotes[index].id === noteId)
                        allNotes.splice(index, 1);
                }
            },

            getUniqueId() {
                return this.uniqueId += 1;
            },

            isMobile() {
                let isMobileDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
                if (isMobileDevice) this.grid = false;
                return isMobileDevice;
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .title{
        text-align: center;
    }

    ul{
        list-style-type: none;
        text-align: center;
        margin: 0;
    }

    li{
        display:inline-block;
        margin:0 10px;
    }

    a{
        color: #fff;
        text-decoration: none;
        padding: 6px 8px;
        border-radius: 10px;
    }

    nav{
        background: #444;
        padding: 14px 0;
        margin-bottom: 40px;
    }


</style>
