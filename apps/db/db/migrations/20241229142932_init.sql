-- migrate:up
create table if not exists users (
  id serial primary key,
  auth0_user_id text not null,
  unique (auth0_user_id)
);

create table if not exists sessions (
  id serial primary key,
  user_id integer not null,
  name text not null,
  is_template boolean not null,
  creted timestamp not null default current_timestamp,
  updated timestamp not null default current_timestamp,
  foreign key (user_id) references users (id) on delete cascade
);

create index if not exists sessions_user_id_idx on sessions (user_id);

create table if not exists session_roles (
  id serial primary key,
  session_id integer not null,
  name text not null,
  discord_role_id text,
  foreign key (session_id) references sessions (id) on delete cascade
);

create index if not exists session_roles_session_id_idx on session_roles (session_id);

create table if not exists session_channels (
  id serial primary key,
  session_id integer not null,
  name text not null,
  discord_channel_id text,
  sort_order integer not null,
  foreign key (session_id) references sessions (id) on delete cascade,
  unique (session_id, sort_order)
);

create index if not exists session_channels_session_id_idx on session_channels (session_id);

create table if not exists session_channel_permissions (
  id serial primary key,
  session_id integer not null,
  role_id integer not null,
  channel_id integer not null,
  can_read boolean not null,
  can_write boolean not null,
  foreign key (session_id) references sessions (id) on delete cascade,
  foreign key (role_id) references session_roles (id) on delete set null,
  foreign key (channel_id) references session_channels (id) on delete set null,
  unique (session_id, role_id, channel_id)
);

create index if not exists session_channel_permissions_session_id_idx on session_channel_permissions (session_id);

create table if not exists session_scenes (
  id serial primary key,
  session_id integer not null,
  parent_scene_id integer,
  name text not null,
  played timestamp,
  foreign key (session_id) references sessions (id) on delete cascade,
  foreign key (parent_scene_id) references session_scenes (id) on delete set null
);

create index if not exists session_scenes_session_id_idx on session_scenes (session_id);

create table if not exists session_scene_operation_types (id serial primary key, name text not null);

insert into
  session_scene_operation_types (name)
values
  ('condition'),
  ('send_message'),
  ('send_file'),
  ('set_variable'),
  ('change_permission'),
  ('change_role_name'),
  ('change_channel_name');

create table if not exists session_scene_operations (
  id serial primary key,
  scene_id integer not null,
  parent_operation_id integer,
  operation_type integer not null,
  operated timestamp,
  foreign key (scene_id) references session_scenes (id) on delete cascade,
  foreign key (operation_type) references session_scene_operation_types (id) on delete cascade
);

create index if not exists session_scene_operations_scene_id_idx on session_scene_operations (scene_id);

CREATE TYPE logical_operator AS ENUM ('AND', 'OR');

CREATE TYPE comparison_operator AS ENUM ('=', '!=', '>', '>=', '<', '<=');

create table if not exists session_scene_operation_condition_group (
  id serial primary key,
  operation_id integer not null,
  parent_group_id integer,
  operator logical_operator not null,
  foreign key (operation_id) references session_scene_operations (id) on delete cascade,
  foreign key (parent_group_id) references session_scene_operation_condition_group (id) on delete set null
);

create index if not exists session_scene_operation_condition_group_operation_id_idx on session_scene_operation_condition_group (operation_id);

create table if not exists session_scene_operations_condition (
  id serial primary key,
  group_id integer not null,
  variable_name text not null,
  operator comparison_operator not null,
  value text not null,
  foreign key (group_id) references session_scene_operation_condition_group (id) on delete cascade
);

create table if not exists session_scene_operations_send_message (
  id serial primary key,
  operation_id integer not null,
  channel_id integer not null,
  message text not null,
  foreign key (operation_id) references session_scene_operations (id) on delete cascade,
  foreign key (channel_id) references session_channels (id) on delete set null
);

create index if not exists session_scene_operations_send_message_operation_id_idx on session_scene_operations_send_message (operation_id);

create table if not exists session_scene_operations_send_file (
  id serial primary key,
  operation_id integer not null,
  channel_id integer not null,
  file_name text not null,
  file_url text not null,
  message text not null,
  foreign key (operation_id) references session_scene_operations (id) on delete cascade,
  foreign key (channel_id) references session_channels (id) on delete set null
);

create index if not exists session_scene_operations_send_file_operation_id_idx on session_scene_operations_send_file (operation_id);

create table if not exists session_scene_operations_set_variable (
  id serial primary key,
  operation_id integer not null,
  variable_name text not null,
  value text not null,
  foreign key (operation_id) references session_scene_operations (id) on delete cascade
);

create index if not exists session_scene_operations_set_variable_operation_id_idx on session_scene_operations_set_variable (operation_id);

create table if not exists session_scene_operations_change_permission (
  id serial primary key,
  operation_id integer not null,
  role_id integer not null,
  channel_id integer not null,
  can_read boolean not null,
  can_write boolean not null,
  foreign key (operation_id) references session_scene_operations (id) on delete cascade,
  foreign key (role_id) references session_roles (id) on delete set null,
  foreign key (channel_id) references session_channels (id) on delete set null
);

create index if not exists session_scene_operations_change_permission_operation_id_idx on session_scene_operations_change_permission (operation_id);

create table if not exists session_scene_operations_change_role_name (
  id serial primary key,
  operation_id integer not null,
  role_id integer not null,
  name text not null,
  foreign key (operation_id) references session_scene_operations (id) on delete cascade,
  foreign key (role_id) references session_roles (id) on delete set null
);

create index if not exists session_scene_operations_change_role_name_operation_id_idx on session_scene_operations_change_role_name (operation_id);

create table if not exists session_scene_operations_change_channel_name (
  id serial primary key,
  operation_id integer not null,
  channel_id integer not null,
  name text not null,
  foreign key (operation_id) references session_scene_operations (id) on delete cascade,
  foreign key (channel_id) references session_channels (id) on delete set null
);

create index if not exists session_scene_operations_change_channel_name_operation_id_idx on session_scene_operations_change_channel_name (operation_id);

create table if not exists session_variables (
  id serial primary key,
  session_id integer not null,
  name text not null,
  value text not null,
  foreign key (session_id) references sessions (id) on delete cascade,
  unique (session_id, name)
);

create index if not exists session_variables_session_id_idx on session_variables (session_id);

-- migrate:down
drop table if exists session_scene_operations_change_channel_name;

drop table if exists session_scene_operations_change_role_name;

drop table if exists session_scene_operations_change_permission;

drop table if exists session_scene_operations_set_variable;

drop table if exists session_scene_operations_send_file;

drop table if exists session_scene_operations_send_message;

drop table if exists session_scene_operations_condition;

drop table if exists session_scene_operation_condition_group;

drop type if exists comparison_operator;

drop type if exists logical_operator;

drop table if exists session_scene_operations;

drop table if exists session_scene_operation_types;

drop table if exists session_scenes;

drop table if exists session_channel_permissions;

drop table if exists session_channels;

drop table if exists session_roles;

drop table if exists sessions;

drop table if exists users;
