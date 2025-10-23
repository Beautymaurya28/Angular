import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';


interface Todo {
id: number;
title: string;
done: boolean;
}
@Component({
selector: 'app-root',
standalone: true,
imports: [FormsModule, NgFor, NgIf, NgClass],
template: `
<main class="wrapper">
<h1> Angular To‑Do</h1>


<section class="add-row">
<input
type="text"
placeholder="What needs to be done?"
[(ngModel)]="newTitle"
(keyup.enter)="add()"
autofocus
/>
<button class="primary" (click)="add()">Add</button>
</section>


<section *ngIf="todos().length; else empty">
<ul class="list">
<li *ngFor="let t of filtered()" [ngClass]="{ done: t.done }">
<label>
<input type="checkbox" [checked]="t.done" (change)="toggle(t)" />
<span>{{ t.title }}</span>
</label>
<button class="ghost" aria-label="Delete" (click)="remove(t.id)">✕</button>
</li>
</ul>
<footer class="footer">
<span>{{ remaining() }} left</span>
<nav class="filters">
<button [class.active]="filter() === 'all'" (click)="setFilter('all')">All</button>
<button [class.active]="filter() === 'active'" (click)="setFilter('active')">Active</button>
<button [class.active]="filter() === 'completed'" (click)="setFilter('completed')">Completed</button>
</nav>
<button class="danger" (click)="clearCompleted()" [disabled]="completedCount() === 0">
Clear completed ({{ completedCount() }})
</button>
</footer>
</section>

<ng-template #empty>
<p class="muted">No tasks yet — add your first one above.</p>
</ng-template>
</main>
`,
styles: [`
:host { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji';
color: #1f2937; display: block; }
.wrapper { max-width: 720px; margin: 3rem auto; padding: 0 1rem; }
h1 { font-size: 1.75rem; margin: 0 0 1rem; }


.add-row { display: grid; grid-template-columns: 1fr auto; gap: .5rem; margin-bottom: 1rem; }
input[type='text'] { padding: .75rem .9rem; border: 1px solid #d1d5db; border-radius: .75rem; outline: none; }
input[type='text']:focus { border-color: #6b7280; box-shadow: 0 0 0 3px rgba(107,114,128,.15); }

button { border: 1px solid transparent; padding: .65rem .9rem; border-radius: .75rem; cursor: pointer; background: #f3f4f6; }
button.primary { background: #111827; color: white; }
button.ghost { background: transparent; padding: .3rem .55rem; font-size: 1.1rem; }
button.danger { background: #fee2e2; }
button:disabled { opacity: .5; cursor: not-allowed; }


.list { list-style: none; padding: 0; margin: 0; display: grid; gap: .5rem; }
li { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: .5rem; padding: .65rem .75rem; border: 1px solid #e5e7eb; border-radius: .75rem; }
li.done span { text-decoration: line-through; color: #9ca3af; }
label { display: flex; align-items: center; gap: .6rem; }

.footer { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin-top: .75rem; }
.filters { display: flex; gap: .5rem; }
.filters button { background: transparent; }
.filters button.active { background: #111827; color: white; }


.muted { color: #6b7280; }
`]
})

export class AppComponent {
newTitle = '';
filter = signal<'all' | 'active' | 'completed'>('all');


// state
todos = signal<Todo[]>(this.load());
nextId = signal<number>(this.todos().reduce((m, t) => Math.max(m, t.id), 0) + 1);


// derived
filtered = computed(() => {
const f = this.filter();
const list = this.todos();
if (f === 'active') return list.filter(t => !t.done);
if (f === 'completed') return list.filter(t => t.done);
return list;
});

remaining = computed(() => this.todos().filter(t => !t.done).length);
completedCount = computed(() => this.todos().filter(t => t.done).length);


// persist to localStorage whenever todos change
private _persist = effect(() => {
localStorage.setItem('todos', JSON.stringify(this.todos()));
});


add(): void {
const title = this.newTitle.trim();
if (!title) return;
const todo: Todo = { id: this.nextId(), title, done: false };
this.todos.update(list => [todo, ...list]);
this.nextId.update(n => n + 1);
this.newTitle = '';
}

toggle(t: Todo): void {
this.todos.update(list => list.map(x => x.id === t.id ? { ...x, done: !x.done } : x));
}


remove(id: number): void {
this.todos.update(list => list.filter(t => t.id !== id));
}


clearCompleted(): void {
this.todos.update(list => list.filter(t => !t.done));
}


setFilter(f: 'all' | 'active' | 'completed'): void {
this.filter.set(f);
}

private load(): Todo[] {
try {
const raw = localStorage.getItem('todos');
return raw ? (JSON.parse(raw) as Todo[]) : [];
} catch {
return [];
}
}
}
