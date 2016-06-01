

````jsx
远程分页

//切换回调
onPageChange(page, sizePerPage){
        console.log(page, sizePerPage);
        //发起分页请求
}

 <BootstrapTable data={this.props.pageList.list}
        pagination={true}
        remote={true}
        currPage="当前页数"
        options={{
                page:"当前页数",
                onPageChange: this.onPageChange
        }}
        fetchInfo={{
        dataTotalSize:"总数"
        }}>
  ...
</BootstrapTable>
````

