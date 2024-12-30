-- migrate:up
create table if not exists users (
  id serial primary key,
  auth0_user_id text not null,
  unique (auth0_user_id)
);

create table if not exists templates (
  id serial primary key,
  user_id integer not null,
  name text not null,
  foreign key (user_id) references users (id) on delete cascade
);

create table if not exists template_roles (
  id serial primary key,
  template_id integer not null,
  name text not null,
  foreign key (template_id) references templates (id) on delete cascade
);

create table if not exists template_channels (
  id serial primary key,
  template_id integer not null,
  name text not null,
  sort_order integer not null,
  foreign key (template_id) references templates (id) on delete cascade,
  unique (template_id, sort_order)
);

create table if not exists template_channel_permissions (
  id serial primary key,
  template_id integer not null,
  role_id integer not null,
  channel_id integer not null,
  can_read boolean not null,
  can_write boolean not null,
  foreign key (template_id) references templates (id) on delete cascade,
  foreign key (role_id) references template_roles (id) on delete set null,
  foreign key (channel_id) references template_channels (id) on delete set null,
  unique (template_id, role_id, channel_id)
);

create table if not exists template_scenes (
  id serial primary key,
  template_id integer not null,
  parent_scene_id integer,
  name text not null,
  foreign key (template_id) references templates (id) on delete cascade,
  foreign key (parent_scene_id) references template_scenes (id) on delete set null
);

create table if not exists template_scene_operation_types (id serial primary key, name text not null);

insert into
  template_scene_operation_types (name)
values
  ('condition'),
  ('send_message'),
  ('send_file'),
  ('set_variable'),
  ('change_permission'),
  ('change_role_name'),
  ('change_channel_name');

create table if not exists template_scene_operations (
  id serial primary key,
  scene_id integer not null,
  parent_operation_id integer,
  operation_type integer not null,
  foreign key (scene_id) references template_scenes (id) on delete cascade,
  foreign key (operation_type) references template_scene_operation_types (id) on delete cascade
);

CREATE TYPE logical_operator AS ENUM ('AND', 'OR');

CREATE TYPE comparison_operator AS ENUM ('=', '!=', '>', '>=', '<', '<=');

create table if not exists template_scene_operation_condition_group (
  id serial primary key,
  operation_id integer not null,
  parent_group_id integer,
  operator logical_operator not null,
  foreign key (operation_id) references template_scene_operations (id) on delete cascade,
  foreign key (parent_group_id) references template_scene_operation_condition_group (id) on delete set null
);

create table if not exists template_scene_operations_condition (
  id serial primary key,
  group_id integer not null,
  variable_name text not null,
  operator comparison_operator not null,
  value text not null,
  foreign key (group_id) references template_scene_operation_condition_group (id) on delete cascade
);

create table if not exists template_scene_operations_send_message (
  id serial primary key,
  operation_id integer not null,
  channel_id integer not null,
  message text not null,
  foreign key (operation_id) references template_scene_operations (id) on delete cascade,
  foreign key (channel_id) references template_channels (id) on delete set null
);

create table if not exists template_scene_operations_send_file (
  id serial primary key,
  operation_id integer not null,
  channel_id integer not null,
  file_name text not null,
  file_url text not null,
  message text not null,
  foreign key (operation_id) references template_scene_operations (id) on delete cascade,
  foreign key (channel_id) references template_channels (id) on delete set null
);

create table if not exists template_scene_operations_set_variable (
  id serial primary key,
  operation_id integer not null,
  variable_name text not null,
  value text not null,
  foreign key (operation_id) references template_scene_operations (id) on delete cascade
);

create table if not exists template_scene_operations_change_permission (
  id serial primary key,
  operation_id integer not null,
  role_id integer not null,
  channel_id integer not null,
  can_read boolean not null,
  can_write boolean not null,
  foreign key (operation_id) references template_scene_operations (id) on delete cascade,
  foreign key (role_id) references template_roles (id) on delete set null,
  foreign key (channel_id) references template_channels (id) on delete set null
);

create table if not exists template_scene_operations_change_role_name (
  id serial primary key,
  operation_id integer not null,
  role_id integer not null,
  name text not null,
  foreign key (operation_id) references template_scene_operations (id) on delete cascade,
  foreign key (role_id) references template_roles (id) on delete set null
);

create table if not exists template_scene_operations_change_channel_name (
  id serial primary key,
  operation_id integer not null,
  channel_id integer not null,
  name text not null,
  foreign key (operation_id) references template_scene_operations (id) on delete cascade,
  foreign key (channel_id) references template_channels (id) on delete set null
);

-- migrate:down
drop table if exists template_scene_operations_change_channel_name;

drop table if exists template_scene_operations_change_role_name;

drop table if exists template_scene_operations_change_permission;

drop table if exists template_scene_operations_set_variable;

drop table if exists template_scene_operations_send_file;

drop table if exists template_scene_operations_send_message;

drop table if exists template_scene_operations_condition;

drop table if exists template_scene_operation_condition_group;

drop type if exists comparison_operator;

drop type if exists logical_operator;

drop table if exists template_scene_operations;

drop table if exists template_scene_operation_types;

drop table if exists template_scenes;

drop table if exists template_channel_permissions;

drop table if exists template_channels;

drop table if exists template_roles;

drop table if exists templates;

drop table if exists users;
