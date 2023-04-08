# 1. 在Blazor中使用Chart.js

1. 首先，从Chart.js官方网站下载Chart.js库文件。
    推荐下载这个构建好的版本<https://cdnjs.com/libraries/Chart.js>，最新版是```v4.2.1```

2. 在Blazor项目中把刚刚下载好的```Chart.js```放到wwwroot目录下。

3. 将下载的Chart.js文件复制到该文件夹中。

4. 在Blazor项目中的Pages文件夹下_Host.cshtml文件中添加以下代码：

   ```html
   <script src="_framework/blazor.webassembly.js"></script>
   <-- 添加下面这句 -->
   <script src="~/Chart.js"></script>
   ```

5. 在Blazor组件中使用Chart.js，需要在组件中添加以下代码：
    注意！这个canvas标签的```id```非常重要！后面调用js的时候要用到它！
    在组件顶部添加一行代码，注入JSRuntime

   ```html
    @page "/"
    @inject IJSRuntime JS

    <PageTitle>BlazorWithChartJS</PageTitle>
    <p>
        <h2>
            在Blazor中使用 
            <code><strong>JavaScript</strong></code>
            调用
            <code><strong>Chart.JS</strong></code>
            绘制曲线图
        </h2>
    </p>
      
    <div class="chart">
        <canvas id="AnimationsChart"></canvas>
    </div>
   ```

6. 在```Index```组件的```@code```代码块中，添加以下C#代码：

   ```csharp
       protected override async Task OnAfterRenderAsync(bool firstRender)
       {
           if (firstRender)
           {
               var jsmodule = $"./Pages/Index.razor.js";
               var jSObject = await JS.InvokeAsync<IJSObjectReference>("import", jsmodule);
               await jSObject.InvokeVoidAsync("animationsChart");
           }
           await base.OnAfterRenderAsync(firstRender);
       }
   ```

7. 接下来我们在组件所在目录下创建一个当前组件隔离的js文件```Index.razor.js```，在组件的代码块中，添加以下JavaScript代码：

   ```javascript
   export function animationsChart() {
           const ctx = document.getElementById('AnimationsChart');

           const data = {
               labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
               datasets: [{
                   label: 'Looping tension',
                   data: [65, 59, 80, 81, 26, 55, 40],
                   fill: false,
                   borderColor: 'rgb(75, 192, 192)',
               }]
           };

           const config = {
               type: 'line',
               data: data,
               options: {
                   animations: {
                       tension: {
                           duration: 1000,
                           easing: 'linear',
                           from: 1,
                           to: 0,
                           loop: true
                       }
                   },
                   scales: {
                       y: {
                           min: 0,
                           max: 100
                       }
                   }
               }
           };

           new Chart(ctx, config);
       }
   ```

   这将创建一个简单的折线图，您可以根据需要更改类型、数据和选项。

8. 运行Blazor应用程序，您应该能够看到您的Chart.js图表！

![blazorChartJS][blazorChartJSRunPng]

更多图表类型等信息，请参阅Chart.js官方文档。

[blazorChartJSRunPng]: /BlazorChartJS/blazorChartJS.png
